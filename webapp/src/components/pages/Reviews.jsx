import React, { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import Feeds from 'components/layout/Feeds/Feeds'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import ReviewItem from 'components/layout/ReviewItem'


export default () => {
  const { search } = useLocation()

  const config = useMemo(() => ({
    apiPath: `/reviews${search}`
  }), [search])

  const renderItem = useCallback(item =>
    <ReviewItem review={item} />, [])


  return (
    <>
      <Header />
      <Main name="reviews">
        <div className="container">
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
