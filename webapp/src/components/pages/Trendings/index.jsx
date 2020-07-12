import React, { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import Feeds from 'components/layout/Feeds'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'

import TrendingItem from './TrendingItem'


export default () => {
  const { search } = useLocation()


  const config = useMemo(() => ({
    apiPath: `/trendings${search}`,
    resolve: trending => ({ ...trending, id: trending.buzzsumoIdentifier })
  }), [search])


  const renderItem = useCallback(item =>
    <TrendingItem trending={item} />, [])


  return (
    <>
      <Header withLinks />
      <Main className="trendings">
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
