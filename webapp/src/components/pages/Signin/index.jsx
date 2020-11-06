import React, { useCallback } from 'react'
import { Form as ReactFinalForm } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'
import { resolveCurrentUser } from 'with-react-redux-login'
import { NavLink } from 'react-router-dom'

import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import useLocationURL from 'components/uses/useLocationURL'
import requests from 'reducers/requests'

import Form from './Form'


const API_PATH = '/users/signin'

export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const locationURL = useLocationURL()


  const handleSubmit = useCallback(
    formValues => new Promise(resolve => {
      dispatch(requestData({
        apiPath: API_PATH,
        body: { ...formValues },
        handleFail: (beforeState, action) =>
          resolve(requests(beforeState.requests, action)[API_PATH].errors),
        handleSuccess: (state, action) => {
          const from = locationURL.searchParams.get('from')
          const nextUrl = from
            ? decodeURIComponent(from)
            : '/sources'
          history.push(nextUrl)
          resolve()
        },
        method: 'POST',
        resolve: resolveCurrentUser
      }))
    }),
    [dispatch, history, locationURL]
  )


  return (
    <>
      <Header />
      <Main className="signin">
        <section>
          <ReactFinalForm
            onSubmit={handleSubmit}
            render={Form}
          />
          {false && (<NavLink
            className="button is-secondary"
            to="/signup"
          >
            Register ?
          </NavLink>)}
        </section>
      </Main>
    </>
  )
}
