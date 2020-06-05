import classnames from 'classnames'
import React, { useCallback } from 'react'
import { Form as ReactFinalForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Route, Switch, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { requestData } from 'redux-thunk-data'
import { resolveCurrentUser } from 'with-react-redux-login'

import Main from 'components/layout/Main'
import requests from 'reducers/requests'
import { orcidDecorator } from 'utils/orcid'

import ApplicationBar from './ApplicationBar'
import Form from './Form'


const API_PATH = '/users/signup'


export default () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const transition = useSelector(state => state.transition)


  const handleSubmit = useCallback(formValues => {
    const { thumb, croppingRect } = formValues
    const body = new FormData()
    body.append('thumb', thumb)
    body.append('croppingRect[x]', croppingRect.x)
    body.append('croppingRect[y]', croppingRect.y)
    body.append('croppingRect[height]', croppingRect.height)
    Object.keys(formValues).forEach(key => {
      if (key === 'thumb' || key === 'croppingRect') {
        return
      }
      body.append(key, formValues[key])
    })

    return new Promise(resolve => {
      dispatch(requestData({
        apiPath: API_PATH,
        body,
        handleFail: (beforeState, action) =>
          resolve(requests(beforeState.requests, action)[API_PATH].errors),
        method: 'POST',
        resolve: resolveCurrentUser
      }))
    })
  }, [dispatch])


  const renderReactFinalForm = useCallback(() => (
    <ReactFinalForm
      decorators={[orcidDecorator]}
      onSubmit={handleSubmit}
      render={Form}
    />
  ), [handleSubmit])


  return (
    <Main className="signup">
      <div className="container">
        <h1 className="title">
          {`Get on board!`}
        </h1>
        <div className="to-signin">
          <NavLink to="/signin">
            (Or already have an account ?)
          </NavLink>
        </div>
        <TransitionGroup>
          <CSSTransition
            {...transition}
            key={location.pathname}
          >
            <div className={classnames('transition-container')}>
              <Switch location={location}>
                <Route
                  component={ApplicationBar}
                  exact
                  path="/signup"
                />
                <Route
                  component={renderReactFinalForm}
                  exact
                  path="/signup/apply/:roleType?"
                />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </Main>
  )
}
