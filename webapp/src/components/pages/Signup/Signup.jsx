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
    this.state = { isFormLoading: false, submitErrors: null }
  }

  handleRequestFail = formResolver => (state, action) => {
    const { payload } = action
    const errors = parseSubmitErrors(payload.errors)
    const nextState = { isFormLoading: false, submitErrors: errors }
    this.setState(nextState, () => formResolver(errors))
  }

  handleRequestSuccess = formResolver => () => {
    const { history } = this.props
    const nextState = { isFormLoading: false, submitErrors: null }
    this.setState(nextState, () => {
      formResolver()
      const nextUrl = `/landing`
      history.push(nextUrl)
    })
  }

  onFormSubmit = formValues => {
    console.log('SUBMIT')
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
    const { isFormLoading, submitErrors } = this.state

    return (
      <Fragment>
        <MainContainer name="signup">
          <div className="container">
            <h1 className="title">{"Get on board!"}</h1>
            {/* <div className="buttons">
              <button className="button">
                <span className="title">Apply as Reviewer</span>
              </button>
              <button className="button">
                <span className="title">Apply as Editor</span>
              </button>
            </div> */}
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
                console.log('CAN SUBMIT', form.errors, submitErrors)
                return (
                  <form
                    autoComplete="off"
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <FormFields onImageChange={this.onImageChange(form)} />
                    <FormFooter canSubmit/>
                    {submitErrors !== null && (
                      <>
                        <span>{"ERRORS"}</span>
                        <span>{Object.values(submitErrors)}</span>
                      </>
                    )}
                  </form>
                )
              }}
            />
            {/* <NavLink className="button is-primary" to="/signin">
              Already have an account ?
            </NavLink> */}
            </div>
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
