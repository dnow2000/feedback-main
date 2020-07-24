import React, { useCallback, useMemo, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import Controls from 'components/layout/Controls'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Icon from 'components/layout/Icon'
import Items from 'components/layout/Items'
import KeywordsBar from 'components/layout/KeywordsBar'
import Main from 'components/layout/Main'
import VerdictItem from 'components/layout/VerdictItem'

import { verdictNormalizer } from 'utils/normalizers'


export default () => {
  const history = useHistory()
  const { search } = useLocation()
  const [showMoreStatus, setShowMoreStatus] = useState(false)

  const config = useMemo(
    () => ({
      apiPath: `/verdicts${search}`,
      normalizer: verdictNormalizer,
    }),
    [search]
  )


  const renderItem = useCallback(item => <VerdictItem verdict={item} />, [])

  const handleShowMore = useCallback(() => {
      setShowMoreStatus(true)
      history.push('/verdicts')
    },
    [history]
  )


  return (
    <>
      <Header withLinks />
      <Main className="landing with-header">
        <section className="hero">
          <div className="container">
            <p className="h1">
              <b>
                {'2000'}
              </b>
              {' articles fact-checked'}
              <br />
              {'by '}
              <b>
                {'14450'}
              </b>
              {' Scientists'}
            </p>
            <Controls
              config={config}
              pathnameOnChange={'/verdicts'}
              render={({handleChange, locationURL}) => (
                <KeywordsBar
                  layout='vertical'
                  onChange={handleChange}
                />
              )}
            />
          </div>
        </section>

        <section className="verdicts">
          <div className="container">
            <div className="section-title">
              <span className="icon-container">
                <Icon
                  className="icon"
                  name="ico-review.svg"
                />
              </span>
              <h3>
                {'Recent Claims'}
              </h3>
              <div className="verdict-items">
                <Items
                  config={config}
                  renderItem={renderItem}
                  shouldLoadMore={showMoreStatus}
                />
                <div className="show-more">
                  <button
                    onClick={handleShowMore}
                    type='button'
                  >
                    {'Show more'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Main>
      <Footer />
    </>
  )
}
