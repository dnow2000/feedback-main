import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { closeModal } from 'redux-react-modals'
import { reinitializeData, requestData } from 'redux-thunk-data'

import { closeMenu } from 'reducers/menu'


const Signout = ({ children }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSignoutClick = useCallback(() => {
    dispatch(requestData({
      apiPath: '/users/signout',
      handleSuccess: () => {
        dispatch(closeMenu())
        history.push('/signin')
        dispatch(reinitializeData())
      },
      name: 'signout',
      stateKey: null
    }))
    dispatch(closeModal("main"))
  }, [dispatch, history])


  return (
    <button onClick={handleSignoutClick}>
      {children}
    </button>
  )
}


Signout.defaultProps = {
  children: null
}

Signout.propTypes = {
  children: PropTypes.node
}

export default Signout
