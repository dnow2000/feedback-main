import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Form } from 'react-final-form'
import { requestData } from 'redux-thunk-data'

import ArticleItemContainer from 'components/layout/ArticleItem/ArticleItemContainer'
import Footer from 'components/layout/Footer'
import Icon from 'components/layout/Icon'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import { articleNormalizer } from 'utils/normalizers'
import getCanSubmit from 'utils/form/getCanSubmit'
import parseSubmitErrors from 'utils/form/parseSubmitErrors'

import FormFieldsContainer from './FormFields/FormFieldsContainer'
import FormFooterContainer from './FormFooter/FormFooterContainer'
import scrapDecorator from './decorators/scrapDecorator'


class Article extends PureComponent {
  constructor() {
    super()
    this.state = { isFormLoading: false }
  }

  componentDidMount() {
    this.handleRequestData()
  }

  handleRequestData = () => {
    const { dispatch, form } = this.props
    const { id, isCreatedEntity } = form

    if (isCreatedEntity) {
      return
    }

    dispatch(
      requestData({
        apiPath: `/articles/${id}`,
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
    const nextState = { isFormLoading: false }

    this.setState(nextState, () => {
      formResolver()
      const nextUrl = `/articles/${datum.id}`
      history.push(nextUrl)
    })
  }

  onFormSubmit = formValues => {
    const { article, dispatch, form } = this.props
    const { method } = form
    const { id } = (article || {})

    const apiPath = `/articles/${id || ''}`
    this.setState({ isFormLoading: true })
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

  render() {
    const { article, canCreateArticle, form, history } = this.props
    const { creationUrl, isCreatedEntity } = form
    const { id } = (article || {})
    const { isFormLoading } = this.state

    return (
      <>
        <HeaderContainer />
        <MainContainer name="article">
          <section className="section hero is-relative">
            <h1 className="title">
              {isCreatedEntity ? 'New Article' : 'Article'}
            </h1>
            {!isCreatedEntity && (
              <div className="is-absolute b12 r8">
                {canCreateArticle && (
                  <button
                    className="button is-primary"
                    onClick={() => history.push(creationUrl)}
                    type="button"
                  >
                    New article
                  </button>
                )}
              </div>
            )}
          </section>

          {id && (
            <section className="section">
              <ArticleItemContainer article={article} />
            </section>
          )}

          <section className="section">
            <h2 className="subtitle flex-columns items-center">
              <Icon className="icon mr12" name="ico-newspaper.svg" />
              DETAILS
            </h2>
            <Form
              decorators={[
                scrapDecorator
              ]}
              initialValues={article || false}
              key={id}
              onSubmit={this.onFormSubmit}
              render={formProps => {
                const {
                  form: { reset: resetForm },
                  handleSubmit,
                  validating
                }= formProps
                const canSubmit = getCanSubmit(
                  Object.assign({ isLoading: isFormLoading }, formProps))
                return (
                  <form
                    autoComplete="off"
                    className="form"
                    disabled={isFormLoading}
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <FormFieldsContainer validating={validating} />
                    <FormFooterContainer
                      canSubmit={canSubmit}
                      isLoading={isFormLoading}
                      resetForm={resetForm}
                    />
                  </form>
                )
              }}
            />
          </section>
        </MainContainer>
        <Footer />
      </>
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
  form: PropTypes.shape({
    creationUrl: PropTypes.string,
    id: PropTypes.string,
    isCreatedEntity: PropTypes.bool,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default Article
