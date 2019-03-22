import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'
import { selectCurrentUser } from 'with-login'

import FormFooter from './FormFooter'
import FormFields from './FormFields'
import ArticleItem from '../Articles/ArticleItem'
import {
  parseSubmitErrors,
  selectNewOrEditEntityContextFromLocation,
  selectSearchFromLocation,
} from '../../form/utils'
import { withRedirectToSigninWhenNotAuthenticated, withRoles } from '../../hocs'
import Header from '../../layout/Header'
import Main from '../../layout/Main'
import {
  selectArticleById,
  selectArticleIdByMatchAndLocation,
  selectCurrentUserReviewPatchByArticleId,
  selectVerdictsByArticleIdAndByUserId
} from '../../../selectors'
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
    this.handleRedirectToEditUrlWhenIdWhileWeAreInNewUrl()
  }

  handleRequestData = () => {
    const { dispatch, location, match } = this.props
    const { params: { reviewId } } = match
    const search = selectSearchFromLocation(location)
    const { articleId } = search || {}
    const newOrEditEntityContext = selectNewOrEditEntityContextFromLocation(
      location
    )
    const { isNewEntity } = newOrEditEntityContext || {}

    dispatch(requestData({ apiPath: '/evaluations' }))
    dispatch(requestData({ apiPath: '/tags?scopes=review' }))

    if (!isNewEntity) {
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
    const { dispatch, location, currentUserReviewPatch } = this.props
    const { id } = currentUserReviewPatch || {}
    const newOrEditEntityContext = selectNewOrEditEntityContextFromLocation(
      location
    )
    const { method } = newOrEditEntityContext || {}
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

  handleRedirectToEditUrlWhenIdWhileWeAreInNewUrl() {
    const { history, location, currentUserReviewPatch } = this.props
    const { id } = currentUserReviewPatch || {}
    const newOrEditEntityContext = selectNewOrEditEntityContextFromLocation(
      location
    )
    const { isNewEntity } = newOrEditEntityContext || {}
    if (isNewEntity && id) {
      history.push(`/reviews/${id}?edit`)
    }
  }

  render() {
    const {
      article,
      currentUserReviewPatch,
      location,
      verdicts
    } = this.props
    const { isFormLoading } = this.state
    const newOrEditEntityContext = selectNewOrEditEntityContextFromLocation(
      location
    )
    const { isNewEntity } = newOrEditEntityContext || {}

    return (
      <Fragment>
        <Header />
        <Main name="review">
          <section className="section hero">
            <h1 className="title">
              {isNewEntity ? 'Create your review' : 'See the review'}
            </h1>
          </section>

          {article && (
            <section className="section">
              <h2 className="subtitle flex-columns items-center">
                REVIEWED ARTICLE
              </h2>
              <ArticleItem article={article} noControl />
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
                    <FormFields />
                    <FormFooter canSubmit={canSubmit} />
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
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  verdicts: PropTypes.array
}

function mapStateToProps(state, ownProps) {
  const articleId = selectArticleIdByMatchAndLocation(
    state,
    ownProps.match,
    ownProps.location
  )
  const currentUserReviewPatch = selectCurrentUserReviewPatchByArticleId(state, articleId)
  const currentUser = selectCurrentUser(state)
  const { id: userId } = (currentUser || {})
  return {
    article: selectArticleById(state, articleId),
    currentUserReviewPatch,
    verdicts: selectVerdictsByArticleIdAndByUserId(state, articleId, userId)
  }
}

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  withRoles({ createUserRoleTypes: ['reviewer'], editRoleTypes: ['reviewer'] }),
  withRouter,
  connect(mapStateToProps)
)(Review)
