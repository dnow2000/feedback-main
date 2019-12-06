import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import { NavLink } from 'react-router-dom'

import MainContainer from 'components/layout/Main/MainContainer'
import HeaderContainer from 'components/layout/Header/HeaderContainer'


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
            <NavLink className="cta" to="/signup">
              Join the community
            </NavLink>
          </div>
        </section>
        <section>
          <div className="container">

            <p className="h2">
              Latest Reviews
            </p>
            <div>

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
