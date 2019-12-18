import classnames from 'classnames'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'

import composeValidators from 'utils/form/composeValidators'
import createParseNumberValue from 'utils/form/createParseNumberValue'
import getRequiredValidate from 'utils/form/getRequiredValidate'
import { ROOT_ASSETS_PATH } from 'utils/config'

import FieldError from '../FieldError'


class PictureField extends PureComponent {

  constructor(props) {
    super(props)
    this.avatarRef = React.createRef()
    this.state = {
      image: null,
      scale: 1,
    }
  }

  componentWillUnmount() {
    if (this.croppingRectInterval) {
      clearInterval(this.croppingRectInterval)
    }
  }

  handleFileAttached = event => {
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

  handleImageChange = () => {
    const { onImageChange } = this.props
    const { image } = this.state
    if (!this.avatarRef) {
      return
    }
    let croppingRect = this.avatarRef.current.getCroppingRect()
    if (croppingRect.height) {
      onImageChange(image, croppingRect)
      return
    }
    this.croppingRectInterval = setInterval(() => {
      croppingRect = this.avatarRef.current.getCroppingRect()
      if (croppingRect.height) {
        onImageChange(image, croppingRect)
        clearInterval(this.croppingRectInterval)
      }
    }, 1000)
  }

  renderSlider = () => {
    return (
      <div className='slider-container'>
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
      id,
      label,
      name,
      readOnly,
      required,
    } = this.props
    const { image, scale } = this.state
    return (
      <div
        className={classnames("picture-field", { readonly: readOnly })}
        id={id}
      >
        <label
          className="field-label"
          htmlFor={name}
        >
          <span>{label}</span>
          {required && !readOnly && <span className="field-asterisk">{"*"}</span>}
        </label>
        <div className="field-control">
          <div>
            <Dropzone
              onDrop={this.handleDrop}
            >
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                  <input
                    disabled={image !== null}
                    name={name}
                    onChange={this.handleFileAttached}
                    {...getInputProps()}
                  />
                  <AvatarEditor
                    image={image || `${ROOT_ASSETS_PATH}/drag.png`}
                    onImageChange={this.handleImageChange}
                    ref={this.avatarRef}
                    scale={scale}
                    style={{ width: '100%', height: '100%' }}
                    border={0}
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
  id: null,
  label: '',
  readOnly: false,
  required: false,
  type: 'text',
  validate: null,
}

PictureField.propTypes = {
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
