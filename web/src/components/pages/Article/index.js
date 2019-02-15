import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'
import withLogin, { selectCurrentUser } from 'with-login'

import ArticleItem from '../Articles/ArticleItem'
import FormFields from './FormFields'
import FormFooter from './FormFooter'
import Footer from '../../layout/Footer'
import { Icon } from '../../layout/Icon'
import Main from '../../layout/Main'
import Header from '../../layout/Header'
import { scrapDecorator } from '../../form/decorators'
import {
  parseSubmitErrors,
  selectNewOrEditEntityContextFromLocation,
} from '../../form/utils'
import { withRoles } from '../../hocs'
import {
  selectArticleById,
  selectEditorRoleByUserId,
  selectCurrentUserReviewByArticleId,
  selectReviewerRoleByUserId,
  selectReviewsByArticleIdAndVerdictId,
  selectVerdictsByArticleId,
} from '../../../selectors'
import { articleNormalizer } from '../../../utils/normalizers'

class Article extends Component {

  constructor() {
    super()
    this.state = { isFormLoading: false }
  }

  componentDidMount() {
    this.handleRequestData()
  }

  handleRequestData = () => {
    const { dispatch, location, match } = this.props
    const { params: { articleId } } = match
    const newOrEditEntityContext = selectNewOrEditEntityContextFromLocation(
      location
    )
    const { isNewEntity } = newOrEditEntityContext || {}

    if (isNewEntity) {
      return
    }

    dispatch(
      requestData('GET', `articles/${articleId}`, {
        normalizer: articleNormalizer,
      })
    )
  }

  handleRequestFail = formResolver => (state, action) => {
    // we return API errors back to the form
    const nextState = { isFormLoading: false }
    const errors = parseSubmitErrors(action.errors)
    this.setState(nextState, () => formResolver(errors))
  }

  handleRequestSuccess = formResolver => (state, action) => {
    const { history } = this.props
    const nextState = { isFormLoading: false }
    this.setState(nextState, () => {
      formResolver()
      const nextUrl = `/articles/${action.data.id}`
      history.push(nextUrl)
    })
  }

  onFormSubmit = formValues => {
    const { article, location } = this.props
    const { id } = (article || {})
    const newOrEditEntityContext = selectNewOrEditEntityContextFromLocation(
      location
    )
    const { method } = newOrEditEntityContext || {}
    const path = `articles/${id || ''}`
    const { dispatch } = this.props
    this.setState({ isFormLoading: true })
    // NOTE: we need to promise the request callbacks
    // in order to inject their payloads into the form
    const formSubmitPromise = new Promise(resolve => {
      const config = {
        body: { ...formValues },
        handleFail: this.handleRequestFail(resolve),
        handleSuccess: this.handleRequestSuccess(resolve),
      }
      dispatch(requestData(method, path, config))
    })
    return formSubmitPromise
  }

  render() {
    const { article, canCreateArticle, location } = this.props
    const { id } = (article || {})
    const { isFormLoading } = this.state
    const { isNewEntity } = selectNewOrEditEntityContextFromLocation(
      location
    )
    return (
      <Fragment>
        <Header />
        <Main name="article">
          <section className="section hero is-relative">
            <h1 className="title">
              {isNewEntity ? 'New Article' : 'Article'}
            </h1>
            {!isNewEntity && (
              <div className="is-absolute b12 r8">
                {canCreateArticle && (
                  <NavLink
                    className="button is-primary"
                    to="/articles/new"
                  >
                    New article
                  </NavLink>
                )}
              </div>
            )}
          </section>

          {id && (
            <section className="section">
              <ArticleItem article={article} />
            </section>
          )}

          <section className="section">
            <h2 className="subtitle flex-columns items-center">
              <Icon className="icon mr12" svg="ico-newspaper" />
              DETAILS
            </h2>
            <Form
              decorators={[
                scrapDecorator
              ]}
              initialValues={article || false}
              key={id}
              onSubmit={this.onFormSubmit}
              render={({
                dirtySinceLastSubmit,
                handleSubmit,
                hasSubmitErrors,
                hasValidationErrors,
                pristine,
                validating,
              }) => {
                const canSubmit =
                  !validating &&
                  (
                    (
                      !pristine
                      && !hasSubmitErrors
                      && !hasValidationErrors
                      && !isFormLoading
                    ) ||
                    (
                      !hasValidationErrors
                      && hasSubmitErrors
                      && dirtySinceLastSubmit
                    )
                  )
                return (
                  <form
                    autoComplete="off"
                    className="form"
                    disabled={isFormLoading}
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <FormFields validating={validating} />
                    <FormFooter canSubmit={canSubmit} isLoading={isFormLoading} />
                  </form>
                )
              }}
            />
          </section>
        </Main>
        <Footer />
      </Fragment>
    )
  }
}

Article.defaultProps = {
  article: null,
  canCreateArticle: false,
}

Article.propTypes = {
  article: PropTypes.object,
  canCreateArticle: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

function mapStateToProps(state, ownProps) {
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = (currentUser || {})
  const { match } = ownProps
  const { params: { articleId } } = match

  const editorRole = selectEditorRoleByUserId(state, currentUserId)
  const reviewerRole = selectReviewerRoleByUserId(state, currentUserId)

  const canCreateArticle = typeof editorRole !== 'undefined'
  const canReview = typeof reviewerRole !== 'undefined'

  return {
    article: selectArticleById(state, articleId),
    canCreateArticle,
    canReview,
    currentUser,
    reviewerRole,
    userReview: selectCurrentUserReviewByArticleId(state, articleId),
    verdicts: selectVerdictsByArticleId(state, articleId),
    withoutVerdictReviews: selectReviewsByArticleIdAndVerdictId(
      state,
      articleId,
      null
    ),
  }
}

export default compose(
  withLogin({ failRedirect: '/signin', isRequired: true }),
  withRoles({ editRoleTypes: ['editor'], createRoleTypes: ['editor'] }),
  withRouter,
  connect(mapStateToProps)
)(Article)
