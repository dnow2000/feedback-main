import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import ReactDropzone from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { requestData } from 'redux-thunk-data'

import { API_THUMBS_URL } from 'utils/config'

import { imagePlugin } from './plugins'


const { addImage } = imagePlugin

const _ = ({
  getEditorState,
  render,
  setEditorState,
  ...ReactDropzoneProps
}) => {
  const dispatch = useDispatch()

  const handleUploadSuccess = useCallback((state, action) => {
    const { payload: { datum } } = action
    const imageId = datum.id
    const src = `${API_THUMBS_URL}/images/${imageId}`

    const editorState = getEditorState()
    const editorStateWithImage = addImage(editorState, src)
    setEditorState(editorStateWithImage)
  }, [getEditorState, setEditorState])

  const handleUploadImage = useCallback(files => {
    const image = files[0]
    const body = new FormData()
    body.append('thumb', image)
    dispatch(
      requestData({
        apiPath: '/images',
        body,
        handleSuccess: handleUploadSuccess,
        method: 'POST'
      })
    )
  }, [dispatch, handleUploadSuccess])

  const reactDropzoneProps = {...ReactDropzoneProps}
  delete reactDropzoneProps.children
  delete reactDropzoneProps.dispatch
  delete reactDropzoneProps.editorState
  delete reactDropzoneProps.render
  delete reactDropzoneProps.setEditorState


  return (
    <ReactDropzone
      {...reactDropzoneProps}
      onDrop={handleUploadImage}
    >
      {reactDropzoneRenderProps =>
        render(reactDropzoneRenderProps)}
    </ReactDropzone>
  )
}

_.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
}

export default _
