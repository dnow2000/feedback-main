/* eslint
  react/jsx-one-expression-per-line: 0 */
import classnames from 'classnames'
import { convertToRaw } from 'draft-js'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field } from 'react-final-form'

import Texteditor from './Texteditor'
import { FieldError } from '../../layout'
import { createValidateRequiredField } from '../../validators'
import { composeValidators, config } from '../../utils'

const validateRequiredField = createValidateRequiredField(config.DEFAULT_REQUIRED_ERROR)

export class TexteditorField extends Component {
  constructor () {
    super()
    this.state = {
      valueLength: 0
    }
  }

  onChange = input => nextEditorState => {
    const { valueLength } = this.state

    const nextContentState = nextEditorState.getCurrentContent()
    const nextPlainText = nextContentState.getPlainText('')
    const nextValueLength = nextPlainText.length

    if (valueLength === 0 && nextValueLength === 0) {
      return
    }
    const newState = { valueLength: nextValueLength }

    // check for split-block event to not automatically scroll down
    const lastChangeType = nextEditorState.getLastChangeType()
    if (lastChangeType === 'split-block' && this.divEditorElement) {
      newState.editorScrollTop = this.divEditorElement.scrollTop
    }
    this.lastChangeType = lastChangeType

    // classic editor state update
    this.setState(newState, () => {
      const raw = convertToRaw(nextContentState)
      const stringifiedRaw = JSON.stringify(raw)
      if (input && input.onChange) {
        input.onChange(stringifiedRaw)
      }
    })
  }

  render () {
    const {
      className,
      label,
      maxLength,
      name,
      placeholder,
      readOnly,
      required,
      validate,
    } = this.props
    const { valueLength } = this.state

    const requiredValidate =
      required && typeof required === 'function'
        ? required
        : (required && validateRequiredField) || undefined

    return (
      <Field
        name={name}
        validate={composeValidators(validate, requiredValidate)}
        render={({ input, meta }) => (
          <div className={classnames("field texteditor-field", className, { readonly: readOnly })}>
            <label htmlFor={name} className={classnames("field-label", { "empty": !label })}>
              {label && (
                <span>
                  <span>{label}</span>
                  {required && !readOnly && <span className="field-asterisk">*</span>}
                  {!readOnly && (
                    <span className="fs12">
                      {' '}
                      ({valueLength} / {maxLength}){' '}
                    </span>
                  )}
                </span>
              )}
            </label>
            <div className="field-control is-relative">
              <div
                className="field-value flex-columns items-center"
                ref={element => { this.divEditorElement = element }}
              >
                <span className="field-inner">
                  <div
                    className="field-texteditor"
                    role="button"
                    tabIndex="0"
                  >
                    <Texteditor
                      className="field-texteditor"
                      initialRawString={input.value}
                      maxLength={maxLength}
                      onChange={this.onChange(input)}
                      placeholder={readOnly ? '' : placeholder}
                      readOnly={readOnly}
                    />
                  </div>
                </span>
              </div>
            </div>
            <FieldError meta={meta} />
          </div>
        )}
      />
    )
  }
}

TexteditorField.defaultProps = {
  className: '',
  label: '',
  maxLength: 1000,
  placeholder: 'Please enter a value',
  readOnly: true,
  required: false,
  validate: null
}

TexteditorField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  validate: PropTypes.func
}

export default TexteditorField
