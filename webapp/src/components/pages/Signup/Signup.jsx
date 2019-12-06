import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { Form } from 'react-final-form'
import { parseSubmitErrors } from 'react-final-form-utils'
import { requestData } from 'redux-thunk-data'
import { resolveCurrentUser } from 'with-react-redux-login'

import MainContainer from 'components/layout/Main/MainContainer'
import FormFields from './FormFields'
import FormFooter from './FormFooter'



function getTopErrorId(errors) {
  if (!errors || Array.isArray(errors)) {
    return null
  }
  const errorIds = Object.keys(errors)
  if (errorIds.length === 0) {
    return null
  }
  return errorIds[0]  // TODO @colas: find top positioned instead of random 
}

function getGlobalError(errors) {
  if (!errors || !Array.isArray(errors) || errors.length === 0) {
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
    const globalError = getGlobalError(errors)
    const topErrorId = getTopErrorId(errors)
    this.setState({ isFormLoading: false, globalError }, () => {
      formResolver(errors)
      if (topErrorId) {
        setTimeout(() => this.scrollToError(topErrorId))
      }
    })
  }

  scrollToError = errorId => {
    const element = document.querySelector(`input[name=${errorId}]`)
    if (!element) {
      console.warn('NO ELEMENT FOUND FOR ', errorId)
      return
    }
    const topErrorPosition = element.offsetTop
    window.scrollTo(0, topErrorPosition - 20)
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
    const { pictureCroppingRect, picture } = formValues
    const body = new FormData()
    body.append('thumb', picture)
    if (pictureCroppingRect) {
      body.append('croppingRect[x]', pictureCroppingRect.x)
      body.append('croppingRect[y]', pictureCroppingRect.y)
      body.append('croppingRect[width]', pictureCroppingRect.width)
      body.append('croppingRect[height]', pictureCroppingRect.height)
    }
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
      console.log('FRONTEND FIELD ERROR', errorIds)
      handleSubmit(event)
      if (errorIds.length > 0) {
        const topErrorId = errorIds[0]  // TODO @colas: get top error
        this.scrollToError(topErrorId)
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
            {this.renderApplicationTypeButtons()}
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
