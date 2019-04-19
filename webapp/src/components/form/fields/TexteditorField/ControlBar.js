import PropTypes from 'prop-types'
import React from 'react'

import ImageAddButton from './ImageAddButton'

export const ControlBar = ({
  getEditorState,
  setEditorState
}) => (
  <div className="is-absolute r8 t-36">
    <ImageAddButton
      getEditorState={getEditorState}
      setEditorState={setEditorState}
    />
  </div>
)

ControlBar.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired
}

export default ControlBar
