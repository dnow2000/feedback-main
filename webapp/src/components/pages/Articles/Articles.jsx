import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { deleteData, requestData } from 'redux-thunk-data'

import ArticleItemContainer from 'components/layout/ArticleItem/ArticleItemContainer'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
import ItemsContainer from 'components/layout/Items/ItemsContainer'
import KeywordsBarContainer from 'components/layout//KeywordsBar/KeywordsBarContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import { articleNormalizer } from 'utils/normalizers'

const Articles = ({
  canCreateArticle,
  dispatch,
  form: { creationUrl },
  history,
  location: { search },
  query,
}) => {
  const queryParams = query.getParams()
  const { reviewable } = queryParams

  const config = useMemo(() => ({
    apiPath: `/articles${search}`,
    normalizer: articleNormalizer
  }), [search])


  const handleCreateArticle = useCallback(() => {
    history.push(creationUrl)
  }, [creationUrl, history])


  const handleReviewableClick = useCallback(reviewableFromEvent => () => {
    dispatch(deleteData(null, { tags: '/articles-items'}))

    const nextReviewable = reviewable === reviewableFromEvent
      ? null
      : reviewable

    history.push(query.getSearchFromUpdate({
      reviewable: nextReviewable,
    }))
  }, [reviewable])


  const renderItem = useCallback(item =>
    <ArticleItemContainer article={item} />)


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
                  onClick={handleReviewableClick(boolString)}
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
            <KeywordsBarContainer />

            <br />
            <ItemsContainer
              config={config}
              key={search}
              renderItem={renderItem}
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
