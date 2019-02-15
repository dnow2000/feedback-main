import {
  BasicInput,
  removeWhitespaces
} from 'pass-culture-shared'
import React, { Component } from 'react'

class UrlInput extends Component {

  onChange = event => {
    const { target: { value } } = event
    const { onChange } = this.props
    onChange(
      removeWhitespaces(value),
      { isSagaCalling: true }
    )
  }

  render () {
    return (
      <div className='with-display-name'>
        <BasicInput
          {...this.props}
          onChange={this.onChange}
          type='text'
        />
      </div>
    )
  }
}

export default UrlInput
