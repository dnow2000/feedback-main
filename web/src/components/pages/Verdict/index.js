import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'
import withLogin from 'with-login'

import FormFooter from './FormFooter'
import FormFields from './FormFields'
import ReviewersManager from './ReviewersManager'
import ArticleItem from '../Articles/ArticleItem'
import {
  parseSubmitErrors,
  selectNewOrEditEntityContextFromLocation,
  selectSearchFromLocation,
} from '../../form/utils'
import { withRoles } from '../../hocs'
import Header from '../../layout/Header'
import Main from '../../layout/Main'
import {
  selectArticleById,
  selectArticleIdByMatchAndLocation,
  selectCurrentUserVerdictPatchByArticleId,
} from '../../../selectors'
import { articleNormalizer, verdictNormalizer } from '../../../utils/normalizers'

class Verdict extends Component {
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
    const { params: { verdictId } } = match
    const search = selectSearchFromLocation(location)
    const { articleId } = search || {}
    const newOrEditEntityContext = selectNewOrEditEntityContextFromLocation(
      location
    )
    const { isNewEntity } = newOrEditEntityContext || {}

    dispatch(requestData('GET', 'evaluations'))
    dispatch(requestData('GET', 'tags'))

    if (!isNewEntity) {
      dispatch(
        requestData('GET', `verdicts/${verdictId}`, {
          isMergingDatum: true,
          normalizer: verdictNormalizer,
        })
      )
      return
    }

    if (!articleId) {
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
      const nextUrl = `/verdicts/${action.data.id}`
      history.push(nextUrl)
    })
  }

  onFormSubmit = formValues => {
    const { location, currentUserVerdictPatch } = this.props
    const { id } = currentUserVerdictPatch || {}
    const newOrEditEntityContext = selectNewOrEditEntityContextFromLocation(
      location
    )
    const { method } = newOrEditEntityContext || {}
    const path = `verdicts/${id || ''}`
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

  handleRedirectToEditUrlWhenIdWhileWeAreInNewUrl() {
    const { history, location, currentUserVerdictPatch } = this.props
    const { id } = currentUserVerdictPatch || {}
    const newOrEditEntityContext = selectNewOrEditEntityContextFromLocation(
      location
    )
    const { isNewEntity } = newOrEditEntityContext || {}
    if (isNewEntity && id) {
      history.push(`/verdicts/${id}?edit`)
    }
  }

  render() {
    const { article, currentUserVerdictPatch, location } = this.props
    const { id: articleId } = (article || {})
    const { isFormLoading } = this.state
    const newOrEditEntityContext = selectNewOrEditEntityContextFromLocation(
      location
    )
    const { isNewEntity } = newOrEditEntityContext || {}

    return (
      <Fragment>
        <Header />
        <Main name="verdict">
          <section className="section hero">
            <h1 className="title">
              {isNewEntity ? 'Create your verdict' : 'See the verdict'}
            </h1>
          </section>

          {article && (
            <section className="section">
              <h2 className="subtitle flex-columns items-center">
                <span>
                  REVIEWED ARTICLE
                </span>
                <span className="flex-auto" />
                <NavLink className="button is-primary right" to={`/articles/${articleId}`}>
                  See article
                </NavLink>
              </h2>
              <ArticleItem article={article} noControl />
            </section>
          )}

          {!isNewEntity && (
            <section className="section">
              <h2 className="subtitle flex-columns items-center">
                REVIEWERS
              </h2>
              <ReviewersManager />
            </section>)}

          <section className="section">
            {!isNewEntity && (
              <h2 className="subtitle flex-columns items-center">
                VERDICT DETAILS
              </h2>
            )}
            <Form
              initialValues={currentUserVerdictPatch}
              onSubmit={this.onFormSubmit}
              render={({
                dirtySinceLastSubmit,
                handleSubmit,
                hasSubmitErrors,
                hasValidationErrors,
                pristine,
              }) => {
                const canSubmit = isNewEntity ||
                  ((!pristine &&
                    !hasSubmitErrors &&
                    !hasValidationErrors &&
                    !isFormLoading) ||
                  (!hasValidationErrors &&
                    hasSubmitErrors &&
                    dirtySinceLastSubmit))
                return (
                  <form
                    autoComplete="off"
                    className="form flex-rows is-full-layout"
                    disabled={isFormLoading}
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    {!isNewEntity && <FormFields />}
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

Verdict.defaultProps = {
  article: null,
  currentUserVerdictPatch: null,
}

Verdict.propTypes = {
  article: PropTypes.object,
  currentUserVerdictPatch: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const articleId = selectArticleIdByMatchAndLocation(
    state,
    ownProps.match,
    ownProps.location
  )
  const currentUserVerdictPatch = selectCurrentUserVerdictPatchByArticleId(state, articleId)
  return {
    article: selectArticleById(state, articleId),
    currentUserVerdictPatch,
  }
}

export default compose(
  withLogin({ failRedirect: '/signin', isRequired: true }),
  withRoles({ createRoleTypes: ['editor'], editRoleTypes: ['editor'] }),
  withRouter,
  connect(mapStateToProps)
)(Verdict)
