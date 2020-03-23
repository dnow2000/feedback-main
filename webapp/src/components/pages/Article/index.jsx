import React, { useCallback, useEffect } from 'react'
import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'
import { useFormidable } from 'with-react-formidable'

import ArticleItem from 'components/layout/ArticleItem'
import Icon from 'components/layout/Icon'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import requests from 'reducers/requests'
import { articleNormalizer } from 'utils/normalizers'
import { getCanSubmit } from 'utils/form'
import { scrapDecorator } from 'utils/scrap'

import FormFields from './FormFields'
import FormFooter from './FormFooter'


const API_PATH = '/articles'


export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const { articleId } = params
  const {
    isCreatedEntity,
    isModifiedEntity,
    method
  } = useFormidable(location, params)


  const { isPending } = useSelector(state => state.requests['/articles']) || {}

  const article = useSelector(state =>
     selectEntityByKeyAndId(state, 'articles', articleId))


  const handleSubmit = useCallback(formValues => {
    let apiPath = API_PATH
    if (isModifiedEntity) {
      apiPath = `${apiPath}/${articleId}`
    }
    return new Promise(resolve => {
      dispatch(requestData({
        apiPath,
        body: { ...formValues },
        handleFail: (beforeState, action) =>
          resolve(requests(beforeState.requests, action)[API_PATH].errors),
        handleSuccess: (state, action) => {
          const { payload: { datum } } = action
          resolve()
          history.push(`/articles/${datum.id}`)
        },
        method
      }))
    })
  }, [articleId, dispatch, history, method, isModifiedEntity])

  const renderForm = useCallback(formProps => {
    const { form: { reset }, handleSubmit, validating } = formProps
    const canSubmit = getCanSubmit({ isLoading: isPending, ...formProps })
    return (
      <form
        autoComplete="off"
        className="form"
        disabled={isPending}
        noValidate
        onSubmit={handleSubmit}
      >
        <FormFields validating={validating} />
        <FormFooter
          canSubmit={canSubmit}
          onCancel={reset}
        />
      </form>
    )
  }, [isPending])


  useEffect(() => {
    if (isCreatedEntity) return
    dispatch(requestData({
      apiPath: `/articles/${articleId}`,
      normalizer: articleNormalizer,
    }))
  }, [articleId, dispatch, isCreatedEntity])


  return (
    <>
      <Header />
      <Main name="article">
        <div className="container">
          {!isCreatedEntity && (
            <section>
              <ArticleItem
                article={article}
                noControl
              />
            </section>
          )}

          <section>
            <h2 className="subtitle">
              <Icon name="ico-newspaper.svg" />
              DETAILS
            </h2>
            <Form
              decorators={[scrapDecorator]}
              initialValues={article || false}
              key={articleId}
              onSubmit={handleSubmit}
              render={renderForm}
            />
          </section>
        </div>
      </Main>
    </>
  )
}
