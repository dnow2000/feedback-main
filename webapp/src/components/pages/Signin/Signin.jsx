import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { Form } from 'react-final-form'
import { parseSubmitErrors } from 'react-final-form-utils'
import { requestData } from 'redux-saga-data'
import { resolveCurrentUser } from 'with-react-redux-login'
import { NavLink } from 'react-router-dom'

import FormFields from './FormFields'
import FormFooter from './FormFooter'
import MainContainer from '../../layout/Main/MainContainer'

class Signin extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isFormLoading: false }
  }

  handleRequestFail = formResolver => (state, action) => {
    // we return API errors back to the form
    const { payload } = action
    const nextState = { isFormLoading: false }
    const errors = parseSubmitErrors(payload.errors)
    this.setState(nextState, () => formResolver(errors))
  }

  handleRequestSuccess = formResolver => () => {
    const { history, query } = this.props
    const queryParams = query.parse()
    const nextState = { isFormLoading: false }
    this.setState(nextState, () => {
      formResolver()
      const nextUrl = queryParams.from
        ? decodeURIComponent(queryParams.from)
        : '/articles'
      history.push(nextUrl)
    })
  }

  onFormSubmit = formValues => {
    const { dispatch } = this.props

    const method = 'POST'
    const apiPath = '/users/signin'

    this.setState({ isFormLoading: true })
    // NOTE: we need to promise the request callbacks
    // in order to inject their payloads into the form
    const formSubmitPromise = new Promise(resolve => {
      dispatch(requestData({
        apiPath,
        body: { ...formValues },
        handleFail: this.handleRequestFail(resolve),
        handleSuccess: this.handleRequestSuccess(resolve),
        method,
        resolve: resolveCurrentUser
      }))
    })
    return formSubmitPromise
  }

  render() {
    const { isFormLoading } = this.state

    return (
      <Fragment>
        <MainContainer name="sign-in">
          <section className="section fullheight flex-center items-center">
            <Form
              onSubmit={this.onFormSubmit}
              render={({
                dirtySinceLastSubmit,
                handleSubmit,
                hasSubmitErrors,
                hasValidationErrors,
                pristine,
              }) => {
                const canSubmit =
                  (!pristine &&
                    !hasSubmitErrors &&
                    !hasValidationErrors &&
                    !isFormLoading) ||
                  (!hasValidationErrors &&
                    hasSubmitErrors &&
                    dirtySinceLastSubmit)
                return (
                  <form
                    className="form flex-rows is-full-layout"
                    autoComplete="off"
                    disabled={isFormLoading}
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <FormFields />
                    <FormFooter canSubmit={canSubmit} />
                  </form>
                )
              }}
            />
          </section>
          <NavLink className="button is-primary" to="/signup">
            Register ?
          </NavLink>
        </MainContainer>
      </Fragment>
    )
  }
}

Signin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired
}

export default Signin
