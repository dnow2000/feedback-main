import capitalize from 'lodash.capitalize'
import React from 'react'
import { NavLink } from 'react-router-dom'

import Main from 'components/layout/Main'
import Header from 'components/layout/Header'
import Icon from 'components/layout/Icon'
import { ROOT_ASSETS_PATH } from 'utils/config'


const Landing = () => {
  return (
    <>
      <Header />
      <Main
        className="landing with-header"
      >
        <section className="hero">
          <div className="container">
            <p className="h1">
              Building an Open-source <br />  
              Database of <b>Misinformation</b> Sources <br /> 
              on <b>COVID-19</b>
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <p className="p">
              As the novel coronavirus continues to spread throughout the world, so does false or misleading information about the pandemic online. <br />
              For instance, a movie called “Plandemic” 
              that <a href="https://healthfeedback.org/plandemic-vignette-featuring-anti-vaccination-activist-judy-mikovits-contains-numerous-false-and-unsupported-claims-about-covid-19/" target="_blank">contains a large number of falsehoods</a> and 
              claims that the COVID-19 pandemic is a planned conspiracy has 
              become <a href="https://www.nytimes.com/2020/05/20/technology/plandemic-movie-youtube-facebook-coronavirus.html" target="_blank">extremely viral</a> in 
              May 2020. 
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <p className="p">
              This graph shows the articles and web platform videos that have republished the movie (green) along with the Facebook groups that have shared a post linking to one of these urls (red). 
              <img 
                src={`${ROOT_ASSETS_PATH}/plandemic.png`} 
                className="image"
                alt="plandemic propagation graph" 
              />
              The online propagation of this video relied on a network of websites and social media accounts, many of which are known to have repeatedly promoted misinformation in the past.
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <p className="p">
              The goal of this project is to propose a data format that allows to build an open database of web entities that repeatedly share misinformation, starting with the topic of COVID-19. <br />
              This should prove useful to Internet users who want to be aware of whether the content they are viewing is likely misleading, and web platforms that want to prevent their recommendation algorithms from pushing misinformation to their users.
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <p className="p">
              The data we’re dealing with consist of the following elements:
              <ul>
                <li><b>Fact-check articles</b> written by a fact-checking organization that investigates the veracity of a specific item making an assertion (the item can be e.g. a Claim, an Article or a Video) and issues a Verdict.</li>
                <li><b>Items reviewed.</b> An item reviewed can be e.g. a Claim, an Article or a Video making one or several verifiable assertions.</li>
                <li><b>Appearances.</b> A url where a Claim or an Article reviewed has been published originally or repeated. Here it is required to distinguish the Stance of the item with respect to the Claim (the item can explicitly or implicitly endorse the Claim as being true or it can refute the claim)</li>
                <li><b>Social media accounts</b> share <b>posts</b> containing Claims or links to urls containing them.</li>
              </ul>
              <img 
                src={`${ROOT_ASSETS_PATH}/database-explanation.png`} 
                className="image"
                alt="database explanation" 
              />              
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-title has-border-top">
              <p className="h2">
                Who we are
              </p>
            </div>
            <p className="p">
            The project is led by volunteers and staff from Science Feedback and we are looking for collaboration with other fact-checking organizations. Volunteer contributors also include Microsoft employees through the Share AI program. <br />
            The project is supported in part by 
            the <a href="https://www.blog.google/outreach-initiatives/google-news-initiative/covid-19-65-million-help-fight-coronavirus-misinformation/" target="_blank">Google News Initiative</a>.
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-title has-border-top">
              <p className="h2">
                Join the effort
              </p>
            </div>
            <p className="p">
              If you’d like to help us make the Internet a more reliable source of credible information during this pandemic and beyond, please join our effort! Here are a few ways:
              <ul>
                <li>
                  <a href="https://airtable.com/shrqvgrtdOvat4bkR" target="_blank">Fill out this form</a> to join our network of citizen scientists which works to identify repetitions of false claims.
                </li>
                <li>
                  <a href="mailto:info@feedback.news" target="_blank">Email us</a> if you are a web developer and want to help write code for our platform (Postgres DB, Python/Flask backend, React front-end).
                </li>
                <li>
                  <a href="https://sciencefeedback.co/donate/" target="_blank">Donate</a> to support this project.
                </li>
              </ul>
            </p>
          </div>
        </section>

        <section className="footer">
          <div className="container is-footer">

            <div className="logo-container">
              <img src={`${ROOT_ASSETS_PATH}/logo_footer.png`} className="image" alt="Community" />
            </div>

            <div className="links-container-big">
              <p className="h3">Community</p>
              <a className="link" href="https://climatefeedback.org/community/" target="_blank">
                Climate Reviewers
              </a>
              <a className="link" href="https://healthfeedback.org/community/" target="_blank">
                Health Reviewers
              </a>
              <a className="link" href="https://sciencefeedback.co/for-scientists/" target="_blank">
                Apply to become a reviewer
              </a>
            </div>

            <div className="links-container-big">
              <p className="h3">Organization</p>
              <a className="link" href="https://sciencefeedback.co/about/" target="_blank">
                About
              </a>
              <a className="link" href="https://sciencefeedback.co/donate/" target="_blank">
                Support us
              </a>
              <a className="link" href="https://sciencefeedback.co/community-standards/" target="_blank">
                Community standards
              </a>
            </div>

            <div className="links-container-small">
              <p className="h3">Contact Us</p>
              <NavLink className="link" to="/">
                Press
              </NavLink>
              <a className="link" href="https://sciencefeedback.co/contact-us/" target="_blank">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </Main>
    </>
  )
}

export default Landing
