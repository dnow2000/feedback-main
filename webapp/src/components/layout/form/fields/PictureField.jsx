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

  render() {
    const {
      className,
      id,
      label,
      name,
      readOnly,
      required,
      type,
      validate,
    } = this.props
    const { image, scale } = this.state

    return (
      <>
        <Field
          name={name}
          validate={composeValidators(validate, getRequiredValidate(required))}
          parse={createParseNumberValue(type)}
          render={({ input, meta }) => (
            <div
              className={classnames("field text-field",
                className, { readonly: readOnly })}
              id={id}
            >
              <label htmlFor={name} className={classnames("field-label", { empty: !label })}>
                {label && (
                  <span>
                    <span>{label}</span>
                    {required && !readOnly && <span className="field-asterisk">*</span>}
                  </span>
                )}
              </label>
              <div className="section">
                <label className="button is-primary is-outlined">
                  {"Attach file"}
                  <input
                    hidden
                    onChange={this.onClickAttachFile}
                    type="file"
                  />
                </label>
              </div>
              <div>
                <Dropzone
                  onDrop={this.handleDrop}
                  disableClick
                  style={{ width: '250px', height: '250px' }}
                >
                  {({getRootProps}) => (
                    <div {...getRootProps()}>
                      <AvatarEditor
                        ref={this.avatarRef}
                        image={image}
                        onImageChange={this.onImageChange}
                        scale={scale}
                      />
                    </div>
                  )}
                </Dropzone>
              </div>
              {image && (
                <>
                  <input
                    name="scale"
                    type="range"
                    onChange={this.handleScale}
                    min='1'
                    max="2"
                    step="0.01"
                    defaultValue="1"
                    className='pt40'
                  />
                </>
              )
              }
              <FieldError meta={meta} />
            </div>
          )}
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
