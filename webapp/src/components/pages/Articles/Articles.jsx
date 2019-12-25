import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { Form } from 'react-final-form'
import { assignData, requestData } from 'redux-thunk-data'

import ArticleItemContainer from 'components/layout/ArticleItem/ArticleItemContainer'
import TextField from 'components/layout/form/fields/TextField'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
import ItemsContainer from 'components/layout/Items/ItemsContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import { articleNormalizer } from 'utils/normalizers'

const Articles = ({
  canCreateArticle,
  dispatch,
  form: { creationUrl },
  history,
  query,
}) => {
  const queryParams = query.getParams()
  const { reviewable } = queryParams

  const config = useMemo(() => ({
    normalizer: articleNormalizer,
    stateKey: 'articles'
  }), [])

  const handleCreateArticle = useCallback(() => {
    history.push(creationUrl)
  }, [creationUrl, history])


  const onKeywordsSubmit = useCallback(values => {
    const { keywords } = values

    const isEmptyKeywords =
      typeof keywords === 'undefined' ||
      keywords === ''

    if (!isEmptyKeywords) {
      dispatch(assignData({ articles: [] }))
    }

    query.getSearchFromUpdate(
      {
        keywords: isEmptyKeywords ? null : keywords,
        page: null,
      }
    )
  }, [dispatch, query])

  const onReviewableClick = useCallback(reviewableFromEvent => () => {
    dispatch(assignData({ articles: [] }))

    const nextReviewable = reviewable === reviewableFromEvent
      ? null
      : reviewable

    query.getSearchFromUpdate(
      {
        page: null,
        reviewable: nextReviewable,
      }
    )
  }, [reviewable])


  return (
    <>
      <HeaderContainer />
      <MainContainer name="articles">
        <div className="container">
          <section className="section hero is-relative">
            <div className="control">

              {['true', 'false'].map(boolString => (
                <button
                  className={classnames("button is-secondary",
                    {
                      "is-inversed": reviewable !== boolString
                    })}
                  key={boolString}
                  onClick={onReviewableClick(boolString)}
                  type="button"
                >
                  {boolString === 'false' && "Not "}reviewable
                </button>
              ))}

              {canCreateArticle && (
                <button
                  className="button is-primary"
                  id="create-article"
                  onClick={handleCreateArticle}
                  type="button"
                >
                  New article
                </button>
              )}
            </div>
          </section>

          <section>
            <Form
              initialValues={queryParams}
              onSubmit={onKeywordsSubmit}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="keywords"
                    placeholder="Type your search"
                    renderValue={
                      () => (
                        <button
                          className="button is-primary is-outlined search-ok"
                          type="submit"
                        >
                          OK
                        </button>
                      )
                    }
                  />
                </form>
              )}
            />

            <br />
            <ItemsContainer
              config={config}
              renderItem={item => <ArticleItemContainer article={item} />}
            />
          </section>
        </div>
      </MainContainer>
    </>
  )
}

Articles.defaultProps = {
  canCreateArticle: false,
}

Articles.propTypes = {
  canCreateArticle: PropTypes.bool,
  location: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired
}

export default Articles
