import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Form } from 'react-final-form'
import { getCanSubmit, parseSubmitErrors } from 'react-final-form-utils'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'

import ArticleItemContainer from 'components/pages/Articles/ArticleItem/ArticleItemContainer'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import { articleNormalizer, verdictNormalizer } from 'utils/normalizers'

import FormFooterContainer from './FormFooter/FormFooterContainer'
import FormFieldsContainer from './FormFields/FormFieldsContainer'
import ReviewersManagerContainer from './ReviewersManager/ReviewersManagerContainer'

class Verdict extends PureComponent {
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
    const { params: { verdictId } } = match
    const queryParams = query.parse()
    const { articleId } = queryParams || {}
    const { isCreatedEntity } = query.context()

    dispatch(requestData({ apiPath: '/evaluations' }))
    dispatch(requestData({ apiPath: '/tags' }))

    if (!isCreatedEntity) {
      dispatch(
        requestData({
          apiPath: `/verdicts/${verdictId}`,
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
      requestData({
        apiPath: `/articles/${articleId}`,
        normalizer: articleNormalizer,
      })
    )
  }

  handleRequestFail = formResolver => (state, action) => {
    const { payload } = action
    // we return API errors back to the form
    const nextState = { isFormLoading: false }
    const errors = parseSubmitErrors(payload.errors)
    this.setState(nextState, () => formResolver(errors))
  }

  handleRequestSuccess = formResolver => (state, action) => {
    const { payload: { datum } } = action
    const { history } = this.props
    const nextState = { isFormLoading: false }
    this.setState(nextState, () => {
      const verdictId = datum.id
      formResolver()
      const nextUrl = `/verdicts/${verdictId}`
      history.push(nextUrl)
    })
  }

  onFormSubmit = formValues => {
    const { currentUserVerdictPatch, dispatch, query } = this.props
    const { id } = currentUserVerdictPatch || {}
    const { method } = query.context()
    const apiPath = `/verdicts/${id || ''}`
    this.setState({ isFormLoading: true })
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
    const { currentUserVerdictPatch, history, query } = this.props
    const { id } = currentUserVerdictPatch || {}
    const { isCreatedEntity } = query.context()
    if (isCreatedEntity && id) {
      history.push(`/verdicts/${id}?modification`)
    }
  }

  render() {
    const { article, currentUserVerdictPatch, query } = this.props
    const { id: articleId } = (article || {})
    const { isFormLoading } = this.state
    const { isCreatedEntity } = query.context()

    return (
      <>
        <HeaderContainer />
        <MainContainer name="verdict">
          <section className="section hero">
            <h1 className="title">
              {isCreatedEntity ? 'Create your verdict' : 'See the verdict'}
            </h1>
          </section>

          {article && (
            <section className="section">
              <h2 className="subtitle flex-columns items-center">
                <span>
                  REVIEWED ARTICLE
                </span>
                <span className="flex-auto" />
                <NavLink
                  className="button is-primary right"
                  to={`/articles/${articleId}`}
                >
                  See article
                </NavLink>
              </h2>
              <ArticleItemContainer article={article} noControl />
            </section>
          )}

          {!isCreatedEntity && (
            <section className="section">
              <h2 className="subtitle flex-columns items-center">
                REVIEWERS
              </h2>
              <ReviewersManagerContainer />
            </section>
          )}

          <section className="section">
            {!isCreatedEntity && (
              <h2 className="subtitle flex-columns items-center">
                VERDICT DETAILS
              </h2>
            )}
            <Form
              initialValues={currentUserVerdictPatch}
              onSubmit={this.onFormSubmit}
              render={formProps => {
                const canSubmit = !isFormLoading && (
                  isCreatedEntity ||
                  getCanSubmit(formProps)
                )
                const { form, handleSubmit } = formProps
                return (
                  <form
                    autoComplete="off"
                    className="form flex-rows is-full-layout"
                    disabled={isFormLoading}
                    noValidate
                    onSubmit={event => event.preventDefault && handleSubmit(event)}
                  >
                    {!isCreatedEntity && <FormFieldsContainer />}
                    <FormFooterContainer
                      canSubmit={canSubmit}
                      form={form}
                    />
                  </form>
                )
              }}
            />
          </section>
        </MainContainer>
      </>
    )
  }
}

Verdict.defaultProps = {
  article: null,
  currentUserVerdictPatch: null,
}

Verdict.propTypes = {
  article: PropTypes.shape(),
  currentUserVerdictPatch: PropTypes.shape(),
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  query: PropTypes.shape().isRequired
}

export default Verdict
