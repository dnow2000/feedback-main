import React, { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Controls from 'components/layout/Controls'
import Header from 'components/layout/Header'
import Items from 'components/layout/Items'
import KeywordsBar from 'components/layout/KeywordsBar'
import Main from 'components/layout/Main'
import VerdictItem from 'components/layout/VerdictItem'
import { verdictNormalizer } from 'utils/normalizers'



export default () => {
  const { search } = useLocation()
  const isAtTop = useSelector(state => state.scroll.isAtTop)

  const config = useMemo(
    () => ({
      apiPath: `/verdicts${search}`,
      normalizer: verdictNormalizer,
    }),
    [search]
  )

  const renderItem = useCallback(item => <VerdictItem verdict={item} />, [])


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

          <Controls
            config={config}
            render={({ handleChange, locationURL }) => {
              const keywords = locationURL.searchParams.get('keywords')
              return (
                <>
                  <KeywordsBar
                    isAtTop={isAtTop}
                    onChange={handleChange}
                    selectedKeywords={keywords}
                  />
                  { keywords !== null && keywords !== 'undefined' && (
                    <h3 className="keywords">
                      {`Search results for "${keywords}"`}
                    </h3>
                  )}
                </>
              )
            }}
          />

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
