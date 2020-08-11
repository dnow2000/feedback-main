import React from 'react'

import Header from 'components/layout/Header'
import Logo from 'components/layout/Logo'
import Main from 'components/layout/Main'
import Footer from 'components/layout/Footer'
import { ROOT_ASSETS_PATH } from 'utils/config'


export default () => (
  <>
    <Header withLinks />
    <Main className="about with-header">
      <section className="hero">
        <div className="container">
          <p className="h1">
            {'Building an Open-source'}
            <br />
            {'Database of '}
            <b>
              {'Misinformation'}
            </b>
            {' Sources '}
            <br />
            {'on '}
            <b>
              {'COVID-19'}
            </b>
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-content">
            <p className="section-text">
              {'As the novel coronavirus continues to spread throughout the world, so does false or misleading information about the pandemic online.'}
              <br />
              {'For instance, a movie called “Plandemic” that '}
              <a
                className="link"
                href="https://healthfeedback.org/plandemic-vignette-featuring-anti-vaccination-activist-judy-mikovits-contains-numerous-false-and-unsupported-claims-about-covid-19/"
                rel="noopener noreferrer"
                target="_blank"
              >
                {'contains a large number of falsehoods '}
              </a>
              {'and claims that the COVID-19 pandemic is a planned conspiracy has become '}
              <a
                className="link"
                href="https://www.nytimes.com/2020/05/20/technology/plandemic-movie-youtube-facebook-coronavirus.html"
                rel="noopener noreferrer"
                target="_blank"
              >
                {'extremely viral '}
              </a>
              {'in May 2020.'}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-content">
            <p className="section-text">
              {'This graph shows the articles and web platform videos that have republished the movie (green) along with the Facebook groups that have shared a post linking to one of these urls (red).'}
              <img
                alt="plandemic propagation graph"
                className="image"
                src={`${ROOT_ASSETS_PATH}/plandemic.png`}
              />
              {'The online propagation of this video relied on a network of websites and social media accounts, many of which are known to have repeatedly promoted misinformation in the past.'}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-content">
            <p className="section-text">
              {'The goal of this project is to propose a data format that allows to build an open database of web entities that repeatedly share misinformation, starting with the topic of COVID-19.'}
              <br />
              {'This should prove useful to Internet users who want to be aware of whether the content they are viewing is likely misleading, and web platforms that want to prevent their recommendation algorithms from pushing misinformation to their users.'}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-content">
            <p className="section-text">
              {'The data we’re dealing with consist of the following elements:'}
            </p>
            <br />
            <ul className="section-text">
              <li>
                <b>
                  {'Fact-check articles'}
                </b>
                {' written by a fact-checking organization that investigates the veracity of a specific item making an assertion (the item can be e.g. a Claim, an Article or a Video) and issues a Verdict.'}
              </li>
              <li>
                <b>
                  {'Items reviewed.'}
                </b>
                {' An item reviewed can be e.g. a Claim, an Article or a Video making one or several verifiable assertions.'}
              </li>
              <li>
                <b>
                  {'Appearances.'}
                </b>
                {' A url where a Claim or an Article reviewed has been published originally or repeated. Here it is required to distinguish the Stance of the item with respect to the Claim (the item can explicitly or implicitly endorse the Claim as being true or it can refute the claim)'}
              </li>
              <li>
                <b>
                  {'Social media accounts'}
                </b>
                {' share '}
                <b>
                  {'posts'}
                </b>
                {' containing Claims or links to urls containing them.'}
              </li>
            </ul>
            <img
              alt="database explanation"
              className="image"
              src={`${ROOT_ASSETS_PATH}/database-explanation.png`}
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
              <Logo asLink={false} />
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
