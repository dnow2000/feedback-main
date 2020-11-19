import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectEntitiesByKeyAndJoin, requestData } from 'redux-thunk-data'

import Controls from 'components/layout/Controls'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Icon from 'components/layout/Icon'
import Items from 'components/layout/Items'
import KeywordsBar from 'components/layout/KeywordsBar'
import Logo from 'components/layout/Logo'
import Main from 'components/layout/Main'
import VerdictItem from 'components/layout/VerdictItem'
import { verdictNormalizer } from 'utils/normalizers'


export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { search } = useLocation()

  const [showMoreStatus, setShowMoreStatus] = useState(false)

  const config = useMemo(() => ({
    apiPath: `/verdicts${search}`,
    normalizer: verdictNormalizer
  }), [search])

  const contentsCount = (useSelector(state =>
    selectEntitiesByKeyAndJoin(state, 'statistics', { key: 'modelName', value: 'Content' }))[0] || {}).count

  const verdictsCount = (useSelector(state =>
    selectEntitiesByKeyAndJoin(state, 'statistics', { key: 'modelName', value: 'Verdict' }))[0] || {}).count


  const renderItem = useCallback(item => <VerdictItem verdict={item} />, [])

  const loadMoreAction = useCallback(() => {
    setShowMoreStatus(true)
    history.push('/verdicts')
  }, [history])

  const renderControls = useCallback(({ handleChange }) => (
    <KeywordsBar
      layout="vertical"
      onChange={handleChange}
    />), [])


  useEffect(() => {
    dispatch(requestData({ apiPath: '/statistics' }))
  }, [dispatch])


  return (
    <>
      <Header withLinks />
      <Main className="landing with-header">
        <section className="hero">
          <div className="hero-content">
            <div className="container">
              <div>
                {verdictsCount > 0 && contentsCount > 0 && (
                  <p className="h1">
                    <b>
                      {verdictsCount}
                    </b>
                    {' reviews'}
                    <br />
                    <b>
                      {contentsCount}
                    </b>
                    {' content URLs flagged'}
                  </p>
                )}
              </div>
              <div>
                <Controls
                  config={config}
                  pathnameOnChange="/verdicts"
                  render={renderControls}
                />
              </div>
            </div>
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
                limit={4}
                loadMoreAction={loadMoreAction}
                renderItem={renderItem}
                shouldLoadMore={showMoreStatus}
              />
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
                {'The project is supported in part by the '}
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
                <Logo
                  asLink={false}
                  type="science_feedback"
                />
                <img
                  alt="google-news-initiative-logo"
                  src="/static/assets/google_news_initiative_logo.png"
                />
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
