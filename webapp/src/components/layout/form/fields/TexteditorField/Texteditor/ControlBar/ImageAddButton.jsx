import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestData } from 'redux-thunk-data'

import { API_THUMBS_URL } from 'utils/config'

import { imagePlugin } from '../plugins'


const { addImage } = imagePlugin


const _ = ({ getEditorState, setEditorState }) => {
  const dispatch = useDispatch()


  const { isPending } = useSelector(state =>
    state.requests['/images']) || []


  const handleUploadSuccess = useCallback((state, action) => {
    const { payload: { datum } } = action
    const imageId = datum.id
    const src = `${API_THUMBS_URL}/images/${imageId}`
    const editorState = getEditorState()
    const editorStateWithImage = addImage(editorState, src)
    setEditorState(editorStateWithImage)
  }, [getEditorState, setEditorState])


  const requesPostImage = useCallback(image => {
    const body = new FormData()
    body.append('thumb', image)
    dispatch(requestData({
      apiPath: '/images',
      body,
      handleSuccess: handleUploadSuccess,
      method: 'POST'
    }))}, [dispatch, handleUploadSuccess])


  const handleUploadClick = useCallback(event => {
    const image = event.target.files[0]
    requesPostImage(image)
  }, [requesPostImage])


  return (
    <label
      className={classnames(
        'image-add-button', {
        'loading': isPending
      })}
      htmlFor="image-add-button"
    >
      Upload an image{' '}
      <input
        id="image-add-button"
        hidden
        onChange={handleUploadClick}
        type="file"
      />
    </label>
  )
}


_.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired
}

export default _
