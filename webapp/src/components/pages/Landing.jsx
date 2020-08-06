import React, { useCallback, useMemo, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

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

  const [linkCount, verdictCount] = useSelector(state =>
    [state.data.appearances?.length, state.data.verdicts?.length]
  ) || [14450, 2000]


  return (
    <>
      <Header withLinks />
      <Main className="landing with-header">
        <section className="hero">
          <div className="container">
            <p className="h1">
              <b>
                {verdictCount}
              </b>
              {' reviews'}
              <br />
              {'and '}
              <b>
                {linkCount}
              </b>
              {' content urls flagged'}
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
              <h2>
                {'Recent Claims'}
              </h2>
            </div>

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
        </section>

        <section className="partners">
          <div className="container">
            <div className="section-title">
              <h2>
                {'Partners'}
              </h2>
            </div>

            <div className="section-content">
              <p className="section-text">
                {'The project is led by volunteers and staff from Science Feedback and we are looking for collaboration with other fact-checking organizations. Volunteer contributors also include Microsoft employees through the Share AI program.'}
              </p>
              <br />
              <p className="section-text">
                {'The project is supported in parts by the '}
                <a
                  className='anchor'
                  href="https://www.blog.google/outreach-initiatives/google-news-initiative/covid-19-65-million-help-fight-coronavirus-misinformation/"
                  rel="noopener noreferrer"
                  target='_blank'
                >
                  {'Google News Initiative.'}
                </a>
              </p>

              <div className="partner-logos">
                <img
                  alt="microsoft-logo"
                  src="/static/assets/microsoft-logo-600x269.png"
                />
              </div>
            </div>
          </div>
        </section>

      </Main>
      <Footer />
    </>
  )
}
