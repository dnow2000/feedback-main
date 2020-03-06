import classnames from 'classnames'
import React, { useCallback } from 'react'
import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'
import { resolveCurrentUser } from 'with-react-redux-login'
import { useQuery } from 'with-react-query'
import { NavLink } from 'react-router-dom'

import TextField from 'components/layout/form/fields/TextField'
import PasswordField from 'components/layout/form/fields/PasswordField'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import { parseSubmitErrors } from 'utils/errors'


export default () => {
  const dispatch = useDispatch()
  const { isPending } = useSelector(state => state.requests['/users/signin']) || {}
  const history = useHistory()
  const location = useLocation()
  const query = useQuery(location.search)
  const { params: { de: from } } = query


  const handleFormSubmit = useCallback(formValues => {
    const formSubmitPromise = new Promise(resolve => {
      dispatch(requestData({
        apiPath: '/users/signin',
        body: { ...formValues },
        handleFail: (state, action) => {
          const { payload } = action
          const errors = parseSubmitErrors(payload.errors)
          resolve(errors)
        },
        handleSuccess: (state, action) => {
          resolve()
          const nextUrl = from
            ? decodeURIComponent(from)
            : '/articles'
          history.push(nextUrl)
        },
        method: 'POST',
        resolve: resolveCurrentUser
      }))
    })
    return formSubmitPromise
  }, [dispatch, from, history])


  return (
    <>
      <Header />
      <Main name="signin" withHeader>
        <section>
          <Form
            onSubmit={handleFormSubmit}
            render={({ handleSubmit }) => {
              return (
                <form
                  autoComplete="off"
                  disabled={isPending}
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="name" value="user" />
                  <TextField
                    id="identifier"
                    required
                    name="identifier"
                    label="login"
                    placeholder="Your login email"
                    type="email"
                  />
                  <PasswordField
                    id="password"
                    required
                    name="password"
                    label="password"
                    placeholder="Your login password"
                  />
                  <button
                    className={classnames('submit', {
                      'is-loading': isPending,
                    })}
                    disabled={isPending}
                    type="submit"
                  >
                      Sign in
                  </button>
                </form>
              )
            }}
          />
          <NavLink className="button is-secondary" to="/signup">
            Register ?
          </NavLink>
        </section>
      </Main>
    </>
  )
}
