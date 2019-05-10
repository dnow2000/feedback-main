import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Form } from 'react-final-form'
import { getCanSubmit, parseSubmitErrors } from 'react-final-form-utils'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-saga-data'

import FormFooterContainer from './FormFooter/FormFooterContainer'
import FormFieldsContainer from './FormFields/FormFieldsContainer'
import ArticleItemContainer from '../Articles/ArticleItem/ArticleItemContainer'
import HeaderContainer from '../../layout/Header/HeaderContainer'
import MainContainer from '../../layout/Main/MainContainer'
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
    const { formInitialValues, dispatch, query } = this.props
    const { id } = formInitialValues || {}
    const { method } = query.context()
    this.setState({ isFormLoading: true })

    const apiPath = `/reviews/${id || ''}`

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
    const { formInitialValues, history, query } = this.props
    const { id } = formInitialValues || {}
    const { isCreatedEntity } = query.context()
    if (isCreatedEntity && id) {
      history.push(`/reviews/${id}?modification`)
    }
  }

  render() {
    const {
      article,
      formInitialValues,
      history,
      query,
      verdicts
    } = this.props
    const { isFormLoading } = this.state
    const { isCreatedEntity } = query.context()

    return (
      <Fragment>
        <HeaderContainer />
        <MainContainer name="review">
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
              initialValues={formInitialValues}
              onSubmit={this.onFormSubmit}
              render={formProps => {
                const { form, handleSubmit } = formProps
                const canSubmit = getCanSubmit(Object.assign(
                  { isLoading: isFormLoading }, formProps))
                return (
                  <form
                    autoComplete="off"
                    className="form flex-rows is-full-layout"
                    disabled={isFormLoading}
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <FormFieldsContainer />
                    <FormFooterContainer
                      canSubmit={canSubmit}
                      form={form}
                      history={history}
                    />
                  </form>
                )
              }}
            />
          </section>

          {verdicts && verdicts.length > 0 && (
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
          )}
        </MainContainer>
      </Fragment>
    )
  }
}

Review.defaultProps = {
  article: null,
  formInitialValues: null,
  verdicts: null
}

Review.propTypes = {
  article: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  formInitialValues: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  verdicts: PropTypes.array
}

export default Review
