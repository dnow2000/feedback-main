import React, { useCallback, useMemo } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'

import ArticleItem from 'components/layout/ArticleItem'
import Feeds from 'components/layout/Feeds/Feeds'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import { articleNormalizer } from 'utils/normalizers'

const Articles = () => {
  const history = useHistory()
  const { search } = useLocation()

  const config = useMemo(() => ({
    apiPath: `/articles${search}`,
    normalizer: articleNormalizer
  }), [search])


  const redirectToArticle = useCallback(articleId =>
    history.push(`/articles/${articleId}`), [history])

  const renderItem = useCallback(item =>
    <ArticleItem
      article={item}
      onClickEdit={redirectToArticle}
    />, [redirectToArticle])


  return (
    <>
      <Header />
      <Main name="articles">
        <div className="container">
          <NavLink to="/articles/creation">
            Créer un article
          </NavLink>
          <br/>
          <br/>
          <section>
            <Feeds
              config={config}
              key={search}
              renderItem={renderItem}
            />
          </section>
        </div>
      </Main>
    </>
  )
}


export default Articles
