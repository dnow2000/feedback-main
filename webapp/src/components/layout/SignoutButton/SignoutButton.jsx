import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { closeModal } from 'redux-react-modals'
import { requestData, reinitializeData } from 'redux-thunk-data'

import { closeMenu } from 'reducers/menu'

class SignoutButton extends PureComponent {

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
      noReinitializeData
    } = this.props

    if (handleSuccess) {
      handleSuccess(this.props)
      return
    }

    if (!noReinitializeData) {
      dispatch(reinitializeData())
    }

    dispatch(closeMenu())

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
  noReinitializeData: null
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
  noReinitializeData: PropTypes.bool
}

export default SignoutButton
