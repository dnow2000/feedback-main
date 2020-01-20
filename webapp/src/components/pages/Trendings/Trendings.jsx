import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'

import HeaderContainer from 'components/layout/Header/HeaderContainer'
import Feeds from 'components/layout/Feeds/Feeds'
import MainContainer from 'components/layout/Main/MainContainer'

import TrendingItemContainer from './TrendingItem/TrendingItemContainer'

const Trendings = ({ location: { search } }) => {
  const config = useMemo(() => ({
    apiPath: `/trendings${search}`,
    resolve: trending => ({...trending, id: trending.buzzsumoId})
  }), [search])


  const renderItem = useCallback(item =>
    <TrendingItemContainer trending={item} />, [])

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

Trendings.defaultProps = {
  trendings: null,
}

Trendings.propTypes = {
  location: PropTypes.object.isRequired
}

export default Trendings
