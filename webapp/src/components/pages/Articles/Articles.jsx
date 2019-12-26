import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { deleteData, requestData } from 'redux-thunk-data'

import ArticleItemContainer from 'components/layout/ArticleItem/ArticleItemContainer'
import Feeds from 'components/layout/Feeds/Feeds'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
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
          <section>
            <Feeds
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
