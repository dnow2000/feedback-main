import React, { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import ArticleItem from 'components/layout/ArticleItem'
import Feeds from 'components/layout/Feeds/Feeds'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import { articleNormalizer } from 'utils/normalizers'

const Articles = () => {
  const { search } = useLocation()

  const config = useMemo(() => ({
    apiPath: `/articles${search}`,
    normalizer: articleNormalizer
  }), [search])

  const renderItem = useCallback(item =>
    <ArticleItem article={item} />, [])


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


export default Articles
