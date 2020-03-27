import React, { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import Header from 'components/layout/Header'
import Feeds from 'components/layout/Feeds/Feeds'
import Main from 'components/layout/Main'

import TrendingItem from './TrendingItem'


export default () => {
  const { search } = useLocation()
  console.log({search})

  const config = useMemo(() => ({
    apiPath: `/trendings${search}`,
    resolve: trending => ({...trending, id: trending.buzzsumoId})
  }), [search])

  const renderItem = useCallback(item =>
    <TrendingItem trending={item} />, [])


  return (
    <>
      <Header />
      <Main name="trendings">
        <div className="container">
          <section>
            <Feeds
              config={config}
              renderItem={renderItem}
            />
          </section>
        </div>
      </Main>
    </>
  )
}
