import { convertFromRaw, EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
} from 'draft-js-buttons'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import ControlBar from './ControlBar/ControlBar'
import ImageDropzone from './ImageDropzone'
import {
  AlignmentTool,
  InlineToolbar,
  LinkButton,
  plugins,
} from './plugins'

class TextEditor extends PureComponent {
  constructor (props) {
    super(props)
    const { value } = props

    const editorState = value
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(value))
        )
      : EditorState.createEmpty()

    this.state = {
      editorState,
      initialValue: value
    }
  }

  componentDidUpdate (prevProps) {
    const { value } = this.props
    const { initialValue } = this.state

    if (!prevProps.value && value) {
      this.handleResetEditorState(value)
      this.handleSetInitialValue(value)
      return
    }

    const shouldResetInitialValue =
      (prevProps.value !== initialValue) &&
      (value === initialValue)
    if (shouldResetInitialValue) {
      this.handleResetEditorState(value)
    }
  }

  handleResetEditorState = rawString => {
    console.log({rawString})
    const raw = JSON.parse(rawString)
    const contentState = convertFromRaw(raw)
    const nextEditorState = EditorState.createWithContent(contentState)
    this.onChange(nextEditorState)
  }

  handleSetInitialValue = initialValue => {
    this.setState({ initialValue })
  }

  onChange = editorState => {
    const { onChange } = this.props

    if (this.shouldStopBecauseMaxLength(editorState)) {
      return
    }

    this.setState({ editorState })
    if (onChange) {
      onChange(editorState)
    }
  }

  shouldStopBecauseMaxLength = nextEditorState => {
    const { maxLength } = this.props

    if (maxLength === null) {
      return false
    }

    const nextContentState = nextEditorState.getCurrentContent()
    const nextPlainText = nextContentState.getPlainText('')
    const nextValueLength = nextPlainText.length

    if (nextValueLength > maxLength - 1) {
      return true
    }

    return false
  }

  onEditorClick = () => {
    const { readOnly } = this.props
    if (readOnly) {
      return
    }
    this.editor.focus()
  }

  onEditorKeyPress = () => {}

  render() {
    const {
      placeholder,
      readOnly
    } = this.props
    const { editorState } = this.state

    return (
      <ImageDropzone
        disabled={readOnly}
        getEditorState={() => editorState}
        setEditorState={this.onChange}
        render={({ getRootProps }) => (
          <div
            {...getRootProps()}
            className="texteditor"
            onClick={this.onEditorClick}
            onKeyPress={this.onEditorKeyPress}
            role="button"
            tabIndex="0"
          >
            {!readOnly && (
              <ControlBar
                getEditorState={() => editorState}
                setEditorState={this.onChange}
              />
            )}
            <Editor
              editorState={editorState}
              onChange={this.onChange}
              placeholder={placeholder}
              plugins={plugins}
              readOnly={readOnly}
              ref={element => { this.editor = element }}
            />
            {!readOnly && (
              <>
                <InlineToolbar>
                  {
                    externalProps => (
                      <>
                        <BoldButton {...externalProps} />
                        <ItalicButton {...externalProps} />
                        <UnderlineButton {...externalProps} />
                        <LinkButton {...externalProps} />
                      </>
                    )
                  }
                </InlineToolbar>
                <AlignmentTool />
              </>
            )}
          </div>
        )}
      />
    )
  }
}

TextEditor.defaultProps = {
  initialRawString: null,
  maxLength: null,
  onChange: null,
  placeholder: null,
  readOnly: true,
  value: null
}

TextEditor.propTypes = {
  initialRawString: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
}

export default TextEditor
