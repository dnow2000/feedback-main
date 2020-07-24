import React, { useCallback, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import Items from 'components/layout/Feeds/Items'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import VerdictItem from 'components/layout/VerdictItem'
import { verdictNormalizer } from 'utils/normalizers'

import KeywordsBar from 'components/layout/Feeds/Controls/KeywordsBar'


export default () => {
  const { search } = useLocation()
  const history = useHistory()
  const keywords = (new URLSearchParams(search)).get('keywords')


  const config = useMemo(
    () => ({
      apiPath: `/verdicts${search}`,
      normalizer: verdictNormalizer,
    }),
    [search]
  )

  const renderItem = useCallback(item => <VerdictItem verdict={item} />, [])

  const handleKeywordsChange = useCallback(
    (key, value) => { history.push(`/verdicts?keywords=${value}`) },
    [history]
  )


  return (
    <>
      <Header />
      <Main className="verdicts">
        <div className="container">
          <section className="hero">
            <h3 className="text-center">
              {'VERDICTS'}
            </h3>
          </section>

          <KeywordsBar onChange={handleKeywordsChange} />

          { keywords !== null && keywords !== 'undefined' && (
            <h3 className="keywords">
              {`Search results for "${keywords}"`}
            </h3>
          )}

          <section>
            <Items
              config={config}
              renderItem={renderItem}
            />
          </section>
        </div>
      </Main>
    </>
  )
}
