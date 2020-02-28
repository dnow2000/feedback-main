import React, { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import Feeds from 'components/layout/Feeds/Items/ItemsContainer'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import VerdictItem from 'components/layout/VerdictItem'
import { verdictNormalizer } from 'utils/normalizers'


export default () => {
  const { search } = useLocation()


  const config = useMemo(() => ({
    apiPath: `/verdicts${search}`,
    normalizer: verdictNormalizer
  }), [search])


  const renderItem = useCallback(item =>
    <VerdictItem verdict={item} />, [])


  return (
    <>
      <Header />
      <Main name='verdicts'>
        <div className="container">
          <section className='hero'>
            <h1 className='title'>
              VERDICTS
            </h1>
          </section>

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
