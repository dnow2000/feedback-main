import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'
import withQueryRouter from 'with-query-router'

import FormFields from './FormFields'
import FormFooter from './FormFooter'
import Header from '../../layout/Header'
import Main from '../../layout/Main'
import { parseSubmitErrors } from '../../form/utils'

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = { isFormLoading: false }
  }

  handleRequestFail = formResolver => (state, action) => {
    // we return API errors back to the form
    const nextState = { isFormLoading: false }
    const errors = parseSubmitErrors(action.errors)
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
    const method = 'POST'
    const path = 'users/signin'
    const { dispatch } = this.props


    this.setState({ isFormLoading: true })
    // NOTE: we need to promise the request callbacks
    // in order to inject their payloads into the form
    const formSubmitPromise = new Promise(resolve => {
      const config = {
        body: { ...formValues },
        handleFail: this.handleRequestFail(resolve),
        handleSuccess: this.handleRequestSuccess(resolve),
        resolve: userFromRequest => Object.assign({ isCurrent: true }, userFromRequest)
      }
      dispatch(requestData(method, path, config))
    })
    return formSubmitPromise
  }

  render() {
    const { isFormLoading } = this.state

    return (
      <Fragment>
        <Header />
        <Main name="sign-in">
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
        </Main>
      </Fragment>
    )
  }
}

Signin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired
}

export default compose(
  withQueryRouter,
  connect()
)(Signin)
