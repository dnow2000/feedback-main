import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROOT_ASSETS_PATH, VERSION } from 'utils/config'


export default () => (
  <div className="footer">
    <div className="logo-container">
      <img
        alt="Community"
        className="logo-element"
        src={`${ROOT_ASSETS_PATH}/logo_footer.png`}
      />
    </div>

    <div className="links-container">
      <p className="h3">
        {'Community'}
      </p>
      <a
        className="link"
        href="https://climatefeedback.org/community/"
        rel="noopener noreferrer"
        target="_blank"
      >
        {'Climate Reviewers'}
      </a>
      <a
        className="link"
        href="https://healthfeedback.org/community/"
        rel="noopener noreferrer"
        target="_blank"
      >
        {'Health Reviewers'}
      </a>
      <a
        className="link"
        href="https://sciencefeedback.co/for-scientists/"
        rel="noopener noreferrer"
        target="_blank"
      >
        {'Apply to become a reviewer'}
      </a>
    </div>

    <div className="links-container">
      <p className="h3">
        {'Organization'}
      </p>
      <a
        className="link"
        href="https://sciencefeedback.co/about/"
        rel="noopener noreferrer"
        target="_blank"
      >
        {'About'}
      </a>
      <a
        className="link"
        href="https://sciencefeedback.co/donate/"
        rel="noopener noreferrer"
        target="_blank"
      >
        {'Support us'}
      </a>
      <a
        className="link"
        href="https://sciencefeedback.co/community-standards/"
        rel="noopener noreferrer"
        target="_blank"
      >
        {'Community standards'}
      </a>
    </div>

    <div className="links-container">
      <p className="h3">
        {'Contact Us'}
      </p>
      <NavLink
        className="link"
        to="/"
      >
        {'Press'}
      </NavLink>
      <a
        className="link"
        href="https://sciencefeedback.co/contact-us/"
        rel="noopener noreferrer"
        target="_blank"
      >
        {'Contact Us'}
      </a>
    </div>
    <p className='app-version'>
      {`Version: ${VERSION}`}
    </p>
  </div>
)
