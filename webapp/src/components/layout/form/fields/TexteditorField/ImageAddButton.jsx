import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestData } from 'redux-saga-data'

import { imagePlugin } from './plugins'
import { THUMBS_URL } from '../../../../../utils/config'

const { addImage } = imagePlugin

export class RawImageAddButton extends Component {
  constructor () {
    super()
    this.state = {
      isLoading: false
    }
  }

  handleUploadSuccess = (state, action) => {
    const { payload: { datum } } = action
    const { getEditorState, setEditorState } = this.props
    const imageId = datum.id
    const src = `${THUMBS_URL}/images/${imageId}`

    this.setState({ isLoading: false }, () => {
      const editorState = getEditorState()
      const editorStateWithImage = addImage(editorState, src)
      setEditorState(editorStateWithImage)
    })

  }

  onUploadClick = event => {
    const { dispatch } = this.props

    const image = event.target.files[0]

    const body = new FormData()

    body.append('thumb', image)

    this.setState({ isLoading: true })

    dispatch(
      requestData({
        apiPath: '/images',
        body,
        handleFail: () => this.setState({ isLoading: false }),
        handleSuccess: this.handleUploadSuccess,
        method: 'POST'
      })
    )
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
          onChange={this.onUploadClick}
          ref={element => { this.input = element }}
          type="file"
        />
      </label>
    )
  }
}


RawImageAddButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired
}

const ImageAddButton = connect()(RawImageAddButton)

export default ImageAddButton
