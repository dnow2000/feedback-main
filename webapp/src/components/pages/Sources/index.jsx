import React, { useCallback, useEffect, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import Feeds from 'components/layout/Feeds'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import useLocationURL from 'components/uses/useLocationURL'
import { contentNormalizer } from 'utils/normalizers'

import SourceItem from './SourceItem'


export default () => {
  const history = useHistory()
  const { search } = useLocation()
  const locationURL = useLocationURL()
  const type = locationURL.searchParams.get('type')
  const collectionName = `${type}s`


  const config = useMemo(() => ({
    tag: 'source-items',
    apiPath: `/${collectionName}${search}`,
    normalizer: contentNormalizer
  }), [collectionName, search])


  const renderItem = useCallback(item =>
    <SourceItem source={item} />, [])


  useEffect(() => {
    if (locationURL.searchParams.get('type')) return
    locationURL.searchParams.set('type', 'content')
    history.push(`${locationURL.pathname}${locationURL.search}`)
  }, [history, locationURL])


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
