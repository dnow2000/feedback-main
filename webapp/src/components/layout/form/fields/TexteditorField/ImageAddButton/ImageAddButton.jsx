import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { requestData } from 'redux-thunk-data'

import { API_THUMBS_URL } from 'utils/config'

import { imagePlugin } from '../plugins'


const { addImage } = imagePlugin

class ImageAddButton extends PureComponent {
  constructor () {
    super()
    this.state = {
      isLoading: false
    }
  }

  handleUploadClick = event => {
    const { requesPostImage } = this.props

    this.setState({ isLoading: true })

    const image = event.target.files[0]
    requesPostImage(image, this.handleUploadSuccess)
  }

  handleUploadSuccess = (state, action) => {
    const { payload: { datum } } = action
    const { getEditorState, setEditorState } = this.props
    const imageId = datum.id
    const src = `${API_THUMBS_URL}/images/${imageId}`

    this.setState({ isLoading: false }, () => {
      const editorState = getEditorState()
      const editorStateWithImage = addImage(editorState, src)
      setEditorState(editorStateWithImage)
    })

  }

  render () {
    const { isLoading } = this.state
    return (
      <label
        className={classnames(
          "button is-primary is-outlined", {
          'loading': isLoading
        })}
        htmlFor="image-add-button"
      >
        Add Image{' '}
        <input
          id="image-add-button"
          hidden
          onChange={this.handleUploadClick}
          ref={element => { this.input = element }}
          type="file"
        />
      </label>
    )
  }
}


ImageAddButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  requesPostImage: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired
}

export default ImageAddButton
