import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import { NavLink } from 'react-router-dom'

import MainContainer from 'components/layout/Main/MainContainer'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
import Icon from 'components/layout/Icon'

import { ROOT_PATH } from 'utils/config'


const Landing = ({requestGetVerdicts}) => {
  useEffect(() => {requestGetVerdicts()}, [])
  return (
    <>
      <HeaderContainer />
      <MainContainer className="with-header" name="landing">
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
        <section>
          <div className="container">
            <div className="section-title">
              <span className="icon-container">
                <Icon className="icon" name="ico-review.svg" />
              </span>
              <p className="h2">
                Latest Reviews
              </p>
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
            <img src={`${ROOT_PATH}/images/community.png`} className="image" alt="Community" />
            <p className="p">
              Science Feedback is a platform that empowers community of experts to assess the credibility of influential information online and provide feedback to editors, platforms and readers
            </p>
            <NavLink className="cta" to="/signup">
              Join the community
            </NavLink>
          </div>
        </section>
        <section className="footer">
          <div className="container is-footer">
            <div className="logo-container">
              <img src={`${ROOT_PATH}/images/logo_footer.png`} className="image" alt="Community" />
            </div>
            <div className="links-container-big">
              <p className="h3">Community</p>
              <NavLink className="link" to="/">
                Climate reviewers
              </NavLink>
              <NavLink className="link" to="/">
                Health reviewers
              </NavLink>
              <NavLink className="link" to="/signup">
                Apply to become a reviewer
              </NavLink>
            </div>
            <div className="links-container-big">
              <p className="h3">Organization</p>
              <NavLink className="link" to="/">
                About
              </NavLink>
              <NavLink className="link" to="/">
                Support us
              </NavLink>
              <NavLink className="link" to="/">
                Community standards
              </NavLink>

            </div>
            <div className="links-container-small">
              <p className="h3">Contact Us</p>
              <NavLink className="link" to="/">
                Press
              </NavLink>
              <NavLink className="link" to="/">
                Contact Us
              </NavLink>

            </div>
          </div>
        </section>

      </MainContainer>

    </>
  )
}

Landing.propTypes = {
  requestGetVerdicts: PropTypes.func.isRequired
}

export default Landing
