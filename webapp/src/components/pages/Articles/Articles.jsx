import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'

import ArticleItemContainer from 'components/layout/ArticleItem/ArticleItemContainer'
import Feeds from 'components/layout/Feeds/Feeds'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import { articleNormalizer } from 'utils/normalizers'

const Articles = ({
  location: { search },
}) => {

  const config = useMemo(() => ({
    apiPath: `/articles${search}`,
    normalizer: articleNormalizer
  }), [search])


  const renderItem = useCallback(item =>
    <ArticleItemContainer article={item} />, [])


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


Articles.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
}

export default Articles
