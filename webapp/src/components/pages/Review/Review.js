import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Form } from 'react-final-form'
import { parseSubmitErrors } from 'react-final-form-utils'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-saga-data'

import FormFooterContainer from './FormFooter/FormFooterContainer'
import FormFieldsContainer from './FormFields/FormFieldsContainer'
import ArticleItemContainer from '../Articles/ArticleItem/ArticleItemContainer'
import Header from '../../layout/Header'
import Main from '../../layout/Main'
import { articleNormalizer, reviewNormalizer } from '../../../utils/normalizers'

class Review extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFormLoading: false,
    }
  }

  componentDidMount() {
    this.handleRequestData()
  }

  componentDidUpdate() {
    this.handleRedirectToModificationUrlWhenIdWhileWeAreInCreationUrl()
  }

  handleRequestData = () => {
    const { dispatch, match, query } = this.props
    const { params: { reviewId } } = match
    const { articleId } = query.parse()
    const { isCreatedEntity } = query.context()

    dispatch(requestData({ apiPath: '/evaluations' }))
    dispatch(requestData({ apiPath: '/tags?scopes=review' }))

    if (!isCreatedEntity) {
      dispatch(
        requestData({
          apiPath: `/reviews/${reviewId}`,
          normalizer: reviewNormalizer,
        })
      )
      return
    }

    if (!articleId) {
      return
    }

    dispatch(
      requestData({
        apiPath: `/articles/${articleId}`,
        normalizer: articleNormalizer,
      })
    )
  }

  handleRequestFail = formResolver => (state, action) => {
    // we return API errors back to the form
    const { payload } = action
    const nextState = { isFormLoading: false }
    const errors = parseSubmitErrors(payload.errors)
    this.setState(nextState, () => formResolver(errors))
  }

  handleRequestSuccess = formResolver => (state, action) => {
    const { payload: { datum } } = action
    const { history } = this.props
    const reviewId = datum.id
    const nextState = { isFormLoading: false }
    this.setState(nextState, () => {
      formResolver()
      const nextUrl = `/reviews/${reviewId}`
      history.push(nextUrl)
    })
  }

  onFormSubmit = formValues => {
    const { currentUserReviewPatch, dispatch, query } = this.props
    const { id } = currentUserReviewPatch || {}
    const { method } = query.context()
    this.setState({ isFormLoading: true })

    const apiPath = `/reviews/${id || ''}`

    // NOTE: we need to promise the request callbacks
    // in order to inject their payloads into the form
    const formSubmitPromise = new Promise(resolve => {
      dispatch(requestData({
        apiPath,
        body: { ...formValues },
        handleFail: this.handleRequestFail(resolve),
        handleSuccess: this.handleRequestSuccess(resolve),
        method
      }))
    })
    return formSubmitPromise
  }

  handleRedirectToModificationUrlWhenIdWhileWeAreInCreationUrl() {
    const { currentUserReviewPatch, history, query } = this.props
    const { id } = currentUserReviewPatch || {}
    const { isCreatedEntity } = query.context()
    if (isCreatedEntity && id) {
      history.push(`/reviews/${id}?modification`)
    }
  }

  render() {
    const {
      article,
      currentUserReviewPatch,
      query,
      verdicts
    } = this.props
    const { isFormLoading } = this.state
    const { isCreatedEntity } = query.context()

    return (
      <Fragment>
        <Header />
        <Main name="review">
          <section className="section hero">
            <h1 className="title">
              {isCreatedEntity ? 'Write your review' : 'See the review'}
            </h1>
          </section>

          {article && (
            <section className="section">
              <h2 className="subtitle flex-columns items-center">
                ARTICLE TO REVIEW
              </h2>
              <ArticleItemContainer article={article} noControl />
            </section>
          )}

          <section className="section">
            <h2 className="subtitle flex-columns items-center">
              REVIEW DETAILS
            </h2>
            <Form
              initialValues={currentUserReviewPatch}
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
                    autoComplete="off"
                    className="form flex-rows is-full-layout"
                    disabled={isFormLoading}
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <FormFieldsContainer />
                    <FormFooterContainer canSubmit={canSubmit} />
                  </form>
                )
              }}
            />
          </section>

          <section className="section">
            <h2 className="subtitle">
              SEE ATTACHED VERDICTS
            </h2>
            {
              verdicts.map(verdict => (
                <NavLink
                  className="button is-secondary"
                  key={verdict.id}
                  to={`/verdicts/${verdict.id}`}
                >
                  {verdict.id}
                </NavLink>
              ))
            }
          </section>
        </Main>
      </Fragment>
    )
  }
}

Review.defaultProps = {
  article: null,
  currentUserReviewPatch: null,
  verdicts: null
}

Review.propTypes = {
  article: PropTypes.object,
  currentUserReviewPatch: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  verdicts: PropTypes.array
}

export default Review
