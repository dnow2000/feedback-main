import { convertFromRaw, EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
} from 'draft-js-buttons'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'

import {
  AlignmentTool,
  InlineToolbar,
  LinkButton,
  plugins,
} from './plugins'
import { ControlBar } from './ControlBar'
import ImageDropzone from './ImageDropzone'

export class TextEditor extends Component {
  constructor (props) {
    super(props)
    const { initialRawString } = props

    const editorState = initialRawString
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(initialRawString))
        )
      : EditorState.createEmpty()

    this.state = { editorState }
  }

  componentDidUpdate (prevProps) {
    const { initialRawString } = this.props
    if (!prevProps.initialRawString && initialRawString) {
      this.shouldResetEditorFromInitialRawString()
    }
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

  shouldResetEditorFromInitialRawString = () => {
    const { initialRawString } = this.props
    const { editorState } = this.state
    const initialRaw = JSON.parse(initialRawString)
    const initialFirstBlock = initialRaw.blocks[0]
    const initialFirstBlockKey = initialFirstBlock.key
    const initialContentState = convertFromRaw(initialRaw)
    const initialEditorState = EditorState.createWithContent(initialContentState)
    const currentState = editorState.getCurrentContent()
    const currentMatchingBlockWithInitial = currentState.getBlockForKey(initialFirstBlockKey)
    const isRawFromDifferentInitialRaw = typeof currentMatchingBlockWithInitial === "undefined"
    if (isRawFromDifferentInitialRaw) {
      this.onChange(initialEditorState)
    }
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
      className,
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
            className={className}
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
              <Fragment>
                <InlineToolbar>
                  {
                    externalProps => (
                      <Fragment>
                        <BoldButton {...externalProps} />
                        <ItalicButton {...externalProps} />
                        <UnderlineButton {...externalProps} />
                        <LinkButton {...externalProps} />
                      </Fragment>
                    )
                  }
                </InlineToolbar>
                <AlignmentTool />
              </Fragment>
            )}
          </div>
        )}
      />
    )
  }
}

TextEditor.defaultProps = {
  className: null,
  initialRawString: null,
  maxLength: null,
  onChange: null,
  placeholder: null,
  readOnly: true
}

TextEditor.propTypes = {
  className: PropTypes.string,
  initialRawString: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool
}

export default TextEditor
