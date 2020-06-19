import PropTypes from 'prop-types'
import React from 'react'

import ImageAddButtonContainer from './ImageAddButton/ImageAddButtonContainer'


const _ = ({
  getEditorState,
  setEditorState
}) => (
  <div className="control-bar">
    <div className="rule">
      (Select a piece of text to add bold, italics or a hypertext link)
    </div>
    <div className="auto" />
    <ImageAddButtonContainer
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
