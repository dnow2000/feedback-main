import React, { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import HeaderContainer from 'components/layout/Header/HeaderContainer'
import Feeds from 'components/layout/Feeds/Feeds'
import MainContainer from 'components/layout/Main/MainContainer'

import TrendingItem from './TrendingItem'

const Trendings = () => {

  const { search } = useLocation()

  const config = useMemo(() => ({
    apiPath: `/trendings${search}`,
    resolve: trending => ({...trending, id: trending.buzzsumoId})
  }), [search])

  const renderItem = useCallback(item =>
    <TrendingItem trending={item} />, [])


  return (
    <>
      <HeaderContainer />
      <MainContainer name="trendings">
        <div className="container">
          <section>
            <Feeds
              config={config}
              renderItem={renderItem}
            />
          </section>
        </div>
      </MainContainer>
    </>
  )
}


export default Trendings
