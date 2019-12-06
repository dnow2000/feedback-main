import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { Form } from 'react-final-form'
import { parseSubmitErrors } from 'react-final-form-utils'
import { requestData } from 'redux-thunk-data'
import { resolveCurrentUser } from 'with-react-redux-login'

import MainContainer from 'components/layout/Main/MainContainer'
import FormFields from './FormFields'
import FormFooter from './FormFooter'



function getBackendFieldErrorId(errors) {
  if (!errors || errors[0]) {
    return null
  }
  const errorIds = Object.keys(errors)
  if (errorIds.length === 0) {
    return null
  }
  return errorIds[0]  // TODO @colas: find top positioned instead of random
}

function getBackendGlobalError(errors) {
  if (!errors || !errors[0]) {
    return null
  }
  const errorIds = Object.keys(errors[0])
  if (!errorIds.includes('global')) {
    return null
  }
  return errors[0]['global']

}

class Signup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isFormLoading: false, globalError: null }
  }

  handleRequestFail = formResolver => (state, action) => {
    const { payload } = action
    const errors = parseSubmitErrors(payload.errors)
    console.log('BACKEND ERRORS', errors)
    const globalError = getBackendGlobalError(errors)
    console.log('BACKEND GLOBAL ERROR', globalError)
    const fieldErrorId = getBackendFieldErrorId(errors)
    console.log('BACKEND FIELD ERROR', fieldErrorId)
    this.setState({ isFormLoading: false, globalError }, () => {
      formResolver(errors)
      if (fieldErrorId) {
        this.scrollToError(fieldErrorId)
      }
    })
  }

  scrollToError = errorId => {
    const element = document.querySelector(`input[name=${errorId}]`)
    if (!element) {
      console.warn('NO ELEMENT FOUND FOR ', errorId)
      return
    }
    const errorPosition = element.offsetTop
    setTimeout(() => window.scrollTo(0, errorPosition - 20))
  }

  handleRequestSuccess = formResolver => () => {
    const { history } = this.props
    const nextState = { isFormLoading: false, globalError: null }
    this.setState(nextState, () => {
      formResolver()
      const nextUrl = `/landing`
      history.push(nextUrl)
    })
  }

  handleSubmitHighLevel = formValues => {
    const { dispatch } = this.props
    const { thumb, croppingRect } = formValues
    const body = new FormData()
    body.append('thumb', thumb)
    body.append('croppingRect[x]', croppingRect.x)
    body.append('croppingRect[y]', croppingRect.y)
    body.append('croppingRect[height]', croppingRect.height)
    Object.keys(formValues).forEach( key => {
      if (key === 'thumb' || key === 'croppingRect') {
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

  onImageChange = form => (thumb, croppingRect) => {
    form.batch(() => {
      form.change('thumb', thumb)
      form.change('croppingRect', croppingRect)
    })
  }

  renderForm = (form) => {
    const {
      globalError,
      isFormLoading
    } = this.state
    const {
      handleSubmit,
      errors
    } = form
    const errorIds = Object.keys(errors)
    const handleSubmitAndScrollIfNeeded = (event) => {
      console.log('FRONTEND FIELD ERROR', errors, errorIds)
      handleSubmit(event)
      if (errorIds.length > 0) {
        const fieldErrorId = errorIds[0]  // TODO @colas: get top error
        this.scrollToError(fieldErrorId)
      }
    }
    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmitAndScrollIfNeeded}
      >
        <FormFields onImageChange={this.onImageChange(form)} />
        <FormFooter canSubmit={!isFormLoading} />
        {globalError !== null && (
          <span>
            {globalError}
          </span>
        )}
      </form>
    )
  }

  renderApplicationTypeButtons() {
    return (
      <div className="buttons">
        <button className="button">
          <span className="title">Apply as Reviewer</span>
        </button>
        <button className="button">
          <span className="title">Apply as Editor</span>
        </button>
      </div>
    )
  }

  render() {
    return (
      <Fragment>
        <MainContainer name="signup">
          <div className="container">
            <h1 className="title">
              {`Get on board!`}
            </h1>
            {/* {this.renderApplicationTypeButtons()} */}
            <Form
              onSubmit={this.handleSubmitHighLevel}
              render={this.renderForm}
            />
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
