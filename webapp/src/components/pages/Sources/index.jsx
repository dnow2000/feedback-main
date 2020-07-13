import React, { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import Feeds from 'components/layout/Feeds'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import useLocationURL from 'components/uses/useLocationURL'
import { contentNormalizer } from 'utils/normalizers'

import SourceItem from './SourceItem'


export default () => {
  const { search } = useLocation()
  const locationURL = useLocationURL()
  const type = locationURL.searchParams.get('type')
  const collectionName = `${type}s`


  const config = useMemo(() => ({
    apiPath: `/${collectionName}${search}`,
    normalizer: contentNormalizer
  }), [collectionName, search])


  const renderItem = useCallback(item =>
    <SourceItem source={item} />, [])


  return (
    <>
      <Header withLinks />
      <Main className="sources">
        <div className="container">
          {/*<NavLink to={`/${collectionName}/creation`}>
            Créer un {type}
          </NavLink>*/}
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
