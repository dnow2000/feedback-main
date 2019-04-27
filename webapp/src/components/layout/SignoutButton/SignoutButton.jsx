import { resetData } from 'fetch-normalize-data'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { closeModal } from 'redux-react-modals'
import { requestData } from 'redux-saga-data'

import { closeNavigation } from '../../../reducers/navigation'

class SignoutButton extends Component {

  handleFail = () => {
    const { handleFail, handleFailRedirect, history } = this.props
    if (handleFail) {
      handleFail(this.props)
      return
    }

    const redirect = handleFailRedirect && handleFailRedirect()
    if (redirect) {
      history.push(redirect)
    }
  }

  handleSuccess = () => {
    const {
      dispatch,
      handleSuccess,
      handleSuccessRedirect,
      history,
      noResetData
    } = this.props

    if (handleSuccess) {
      handleSuccess(this.props)
      return
    }

    if (!noResetData) {
      dispatch(resetData())
    }

    dispatch(closeNavigation())

    const redirect = handleSuccessRedirect && handleSuccessRedirect()
    if (redirect) {
      history.push(redirect)
    }
  }

  onSignoutClick = () => {
    const { dispatch } = this.props
    dispatch(
      requestData({
        apiPath: '/users/signout',
        handleFail: this.handleFail,
        handleSuccess: this.handleSuccess,
        name: 'signout',
      })
    )
    dispatch(closeModal("main"))
  }

  render() {
    const { children, className, Tag } = this.props
    return (
      <Tag onClick={this.onSignoutClick} className={className}>
        {children}
      </Tag>
    )
  }
}


SignoutButton.defaultProps = {
  Tag: 'button',
  children: null,
  className: null,
  handleFail: null,
  handleFailRedirect: null,
  handleSuccess: null,
  handleSuccessRedirect: null,
  noResetData: null
}

SignoutButton.propTypes = {
  Tag: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  handleFail: PropTypes.func,
  handleFailRedirect: PropTypes.func,
  handleSuccess: PropTypes.func,
  handleSuccessRedirect: PropTypes.func,
  history: PropTypes.object.isRequired,
  noResetData: PropTypes.bool
}

export default SignoutButton
