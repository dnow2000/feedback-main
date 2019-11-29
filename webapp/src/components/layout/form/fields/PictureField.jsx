import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import {
  createParseNumberValue,
  composeValidators
} from 'react-final-form-utils'

import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'

import { FieldError } from '../layout'
import getRequiredValidate from '../utils/getRequiredValidate'

class PictureField extends React.PureComponent {

  constructor(props) {
    super(props)
    this.avatarRef = React.createRef()
    this.state = {
      image: null,
      scale: 1,
    }
  }

  onClickAttachFile = event => {
    this.setState({
      image: event.target.files[0],
    })
  }

  handleScale = event => {
    const scale = parseFloat(event.target.value)
    this.setState({ scale })
  }

  handleDrop = dropped => {
    this.setState({ image: dropped[0] })
  }

  onImageChange = () => {
    const { onImageChange } = this.props
    const { image } = this.state
    if (!this.avatarRef) {
      return
    }
    const croppingRect = this.avatarRef.current.getCroppingRect()
    onImageChange(image, croppingRect)
  }

  renderSlider = () => {
    return (
      <div
        className='slider-container'
      >
        <input
          defaultValue="1"
          max="2"
          min='1'
          name="scale"
          onChange={this.handleScale}
          step="0.01"
          type="range"
        />
      </div>
    )
  }

  renderField = ({ input, meta }) => {
    const {
      className,
      id,
      label,
      name,
      readOnly,
      required,
    } = this.props
    const { image, scale } = this.state
    return (
      <div
        className={classnames("field", className, { readonly: readOnly })}
        id={id}
      >
        <label
          className="field-label"
          htmlFor={name}
        >
          <span>{label}</span>
          {required && !readOnly && <span className="field-asterisk">{"*"}</span>}
        </label>
        <div className="field-picture">
          <div>
            <Dropzone
              className="fpo"
              onDrop={this.handleDrop}
            >
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                  <input
                    onChange={this.onClickAttachFile}
                    {...getInputProps()}
                  />
                  <AvatarEditor
                    image={image}
                    onImageChange={this.onImageChange}
                    ref={this.avatarRef}
                    scale={scale}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              )}
            </Dropzone>
          </div>
          {image && this.renderSlider()}
        </div>
        <FieldError meta={meta} />
      </div>
    )
  }


  render() {
    const {
      name,
      required,
      type,
      validate,
    } = this.props
    return (
      <>
        <Field
          name={name}
          parse={createParseNumberValue(type)}
          render={this.renderField}
          validate={composeValidators(validate, getRequiredValidate(required))}
        />

      </>
    )
  }
}

PictureField.defaultProps = {
  className: '',
  id: null,
  label: '',
  readOnly: false,
  required: false,
  type: 'text',
  validate: null,
}

PictureField.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onImageChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  type: PropTypes.string,
  validate: PropTypes.func,
}

export default PictureField
