import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { Form } from 'react-final-form'
import { parseSubmitErrors } from 'react-final-form-utils'
import { requestData } from 'redux-thunk-data'
import { resolveCurrentUser } from 'with-react-redux-login'
import { NavLink } from 'react-router-dom'

import MainContainer from 'components/layout/Main/MainContainer'

import FormFields from './FormFields'
import FormFooter from './FormFooter'

class Signup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isFormLoading: false }
  }

  handleRequestFail = formResolver => (state, action) => {
    const { payload } = action
    const nextState = { isFormLoading: false }
    const errors = parseSubmitErrors(payload.errors)
    this.setState(nextState, () => formResolver(errors))
  }

  handleRequestSuccess = formResolver => () => {
    const { history } = this.props
    const nextState = { isFormLoading: false }
    this.setState(nextState, () => {
      formResolver()
      const nextUrl = `/home`
      history.push(nextUrl)
    })
  }

  onFormSubmit = formValues => {
    const { dispatch } = this.props
    const { pictureCroppingRect, picture } = formValues

    const body = new FormData()
    body.append('thumb', picture)
    body.append('croppingRect[x]', pictureCroppingRect.x)
    body.append('croppingRect[y]', pictureCroppingRect.y)
    body.append('croppingRect[width]', pictureCroppingRect.width)
    body.append('croppingRect[height]', pictureCroppingRect.height)
    Object.keys(formValues).forEach( key => {
      if (key === 'picture' || key === 'pictureCroppingRect') {
        return
      }
      body.append(key, formValues[key])
    })

    this.setState({ isFormLoading: true })
    const formSubmitPromise = new Promise(resolve => {
      dispatch(requestData({
        apiPath: '/users/signup',
        body,
        handleFail: this.handleRequestFail(resolve),
        handleSuccess: this.handleRequestSuccess(resolve),
        method: 'POST',
        resolve: resolveCurrentUser
      }))
    })

    return formSubmitPromise
  }

  onImageChange = form => (picture, pictureCroppingRect) => {
    form.batch(() => {
      form.change('picture', picture)
      form.change('pictureCroppingRect', pictureCroppingRect)
    })
  }

  render() {
    const { isFormLoading } = this.state

    return (
      <Fragment>
        <MainContainer name="sign-up">
          <section className="section fullheight flex-center items-center">
            <Form
              onSubmit={this.onFormSubmit}
              render={(form) => {
                const {
                  dirtySinceLastSubmit,
                  handleSubmit,
                  hasSubmitErrors,
                  hasValidationErrors,
                  pristine,
                } = form
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
                    <FormFields onImageChange={this.onImageChange(form)} />
                    <FormFooter canSubmit={canSubmit} />
                  </form>
                )
              }}
            />
          </section>
          <NavLink className="button is-primary" to="/signin">
            Already have an account ?
          </NavLink>
        </MainContainer>
      </Fragment>
    )
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default Signup
