import React, { useCallback, useEffect,  useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import Feeds from 'components/layout/Feeds'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import useLocationURL from 'components/uses/useLocationURL'

import TrendingItem from './TrendingItem'


export default () => {
  const history = useHistory()
  const locationURL = useLocationURL()


  const config = useMemo(() => ({
    apiPath: `/trendings${locationURL.search}`,
    resolve: trending => ({ ...trending, id: trending.buzzsumoIdentifier })
  }), [locationURL])


  const renderItem = useCallback(item =>
    <TrendingItem trending={item} />, [])


  useEffect(() => {
    if (locationURL.searchParams.get('type')) return
    locationURL.searchParams.set('type', 'content')
    history.push(`${locationURL.pathname}${locationURL.search}`)
  }, [history, locationURL])


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
