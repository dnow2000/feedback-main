import capitalize from 'lodash.capitalize'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'

import Main from 'components/layout/Main'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Icon from 'components/layout/Icon'
import VerdictItem from 'components/layout/VerdictItem'
import { APP_NAME, ROOT_ASSETS_PATH } from 'utils/config'


export default () => {
  const dispatch = useDispatch()

  const verdicts = useSelector(state => state.data.verdicts)

  useEffect(() => {
    dispatch(requestData({
      apiPath: "/verdicts",
      normalizer: { content: "contents" }
    }))
  }, [dispatch])


  return (
    <>
      <Header />
      <Main
        className="landing with-header"
      >
        <section className="hero">
          <div className="container">
            <p className="h1">
              <b>2000</b> articles fact-checked<br />
              by <b>14450</b> Scientists
            </p>
            <NavLink className="cta white" to="/signup">
              Join the community
            </NavLink>
          </div>
        </section>

        <section className="verdicts">
          <div className="container">
            <div className="section-title">
              <span className="icon-container">
                <Icon className="icon" name="ico-review.svg" />
              </span>
              <p className="h2">
                Latest Reviews
              </p>
              <div className="items">
                {(verdicts || []).map(verdict => (
                    <div
                      className="item-container"
                      key={verdict.id}
                    >
                      <VerdictItem verdict={verdict} />
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-title has-border-top">
              <span className="icon-container">
                <Icon className="icon" name="ico-dna.svg" />
              </span>
              <p className="h2">
                Who we are
              </p>
            </div>
            <img src={`${ROOT_ASSETS_PATH}/community.png`} className="image" alt="Community" />
            <p className="p">
              {capitalize(APP_NAME)} is a platform that empowers community of experts to assess the credibility of influential information online and provide feedback to editors, platforms and readers
            </p>
            <NavLink className="cta" to="/signup">
              Join the community
            </NavLink>
          </div>
        </section>
      </Main>

      <Footer />
    </>
  )
}
