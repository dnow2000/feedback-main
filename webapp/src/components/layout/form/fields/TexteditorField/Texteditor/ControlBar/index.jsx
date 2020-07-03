import PropTypes from 'prop-types'
import React from 'react'

import ImageAddButton from './ImageAddButton'


const _ = ({
  getEditorState,
  setEditorState
}) => (
  <div className="control-bar">
    <div className="rule">
      (Select a piece of text to add bold, italics or a hypertext link)
    </div>
    <div className="auto" />
    <ImageAddButton
      getEditorState={getEditorState}
      setEditorState={setEditorState}
    />
  </div>
)

_.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired
}

export default _
