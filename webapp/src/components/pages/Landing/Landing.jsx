import React, { Fragment } from "react"
import { NavLink } from 'react-router-dom'

import MainContainer from 'components/layout/Main/MainContainer'

const titleClassName = "title has-text-grey has-text-weight-normal is-size-1"
const subtitleClassName = "subtitle has-text-grey-light is-size-3"

const Landing = () => (
  <Fragment>
    <MainContainer name="landing">
        <div className="col-1of2">
          <p className={titleClassName}>
            On fait du fact checking, rejoins nous ;)
          </p>
          <br />
          <p className={subtitleClassName}>
            Science Feedback is a platform that empowers community of experts to assess the credibility of influential information online and provide feedback to editors, platforms and readers
          </p>
        </div>
        <NavLink className="button is-primary" to="/signup">
          Register
        </NavLink>
        <NavLink className="button is-primary" to="/signin">
          Already have an account ?
        </NavLink>
    </MainContainer>

  </Fragment>
)

export default Landing
