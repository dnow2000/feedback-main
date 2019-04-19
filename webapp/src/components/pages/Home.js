import classnames from "classnames"
import React, { Fragment } from "react"
import { connect } from "react-redux"
import { compose } from "redux"

import { Icon } from '../layout/Icon'
import Header from '../layout/Header'
import Main from "../layout/Main"
import Stream from "../layout/Stream"
import { ROOT_PATH } from "../../utils/config"

const sectionClassName = "section fullheight flex-center items-center is-index-middle is-relative"
const titleClassName = "title has-text-grey has-text-weight-normal is-size-1"
const subtitleClassName = "subtitle has-text-grey-light is-size-3"
const bubbleClassName = "bubble is-absolute is-index-bottom"

const Home = () => (
  <Fragment>
    <Header />
    <Main name="home">
      <section className={sectionClassName}>
        <div className="col-1of2">
          <p className={titleClassName}>
            Experts
            {"'"}
            assessment of news credibility at scale
          </p>
          <br />
          <p className={subtitleClassName}>
            Science Feedback is a platform that empowers community of experts to assess the credibility of influential information online and provide feedback to editors, platforms and readers
          </p>
        </div>
        <div className="col-1of2 center">
          <Icon svg="hero" />
        </div>
      </section>

      <section className={classnames(sectionClassName, "has-background-grey-dark")}>
        <Icon className={classnames(bubbleClassName, "bubble-left")} svg="bubbles_one" />
        <div className="col-1of2">
          <img alt="monitor" src={`${ROOT_PATH}/images/monitor.png`} />
        </div>
        <div className="col-1of2">
          <p className={titleClassName}>
            Monitor the content that matters
          </p>
          <br />
          <p className={subtitleClassName}>
            Monitor the most influential content across all social networks, on given topics
          </p>
          <p className={subtitleClassName}>
            Detect if an influential article or claim is verifiable
          </p>
        </div>
      </section>

      <section className={sectionClassName}>
        <div className="col-1of2">
          <p className={titleClassName}>
            Expert matchmaking
          </p>
          <br />
          <p className={subtitleClassName}>
            Detects article or claim topic
          </p>
          <p className={subtitleClassName}>
            Recommends experts based on verified expertise and publications
          </p>
        </div>
        <div className="col-1of2" style={{ height: "450px" }}>
          <Stream>
            {
              [
                'reviewer-corinne-le-quere',
                'reviewer-wolfgang-cramer',
                'reviewer-aimee-slangen'
              ].map(name => (
                <figure className="box" key={name}>
                  <img
                    alt="expert"
                    src={`${ROOT_PATH}/images/${name}.png`}
                    style={{ width: "400px" }}
                  />
                </figure>
              ))
            }
          </Stream>
        </div>
      </section>

      <section className={sectionClassName} style={{background: "linear-gradient(90deg,#54bf3a,#bde366)"}}>
        <Icon className={classnames(bubbleClassName, "bubble-left")} svg="bubbles_two" />
        <div className="col-1of2">
          <img alt="collaboration" src={`${ROOT_PATH}/images/collaborate.png`} />
        </div>
        <div className="col-1of2">
          <p className={titleClassName.replace("has-text-grey", "has-text-white")}>
            Facilitate experts to collaborate on a review
          </p>
          <br />
          <p className={subtitleClassName.replace("has-text-grey-light", "has-text-white")}>
            Experts can collectively comment, characterise content accuracy and credibility with tags and ratings
          </p>
        </div>
      </section>

      <section className={sectionClassName}>
        <Icon className={classnames(bubbleClassName, "bubble-right")} svg="bubbles_three" />
        <div className="col-1of2">
          <p className={titleClassName}>
            Create and promote reviews
          </p>
          <br />
          <p className={subtitleClassName}>
            Compile scientists’ comments into machine readable reviews that can be featured on web platforms
          </p>
          <p className={subtitleClassName}>
            Promote on social media
          </p>
          <p className={subtitleClassName}>
            Send feedback to Editors
          </p>
        </div>
        <div className="col-1of2" style={{ height: "400px" }}>
          <img
            alt="promote"
            src={`${ROOT_PATH}/images/promote.png`}
            style={{
              borderRadius: "5px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
              height: "400px"
            }}
          />
        </div>
      </section>

      <section className={classnames(sectionClassName, "has-background-grey-dark")}>
        <div className="col-1of2">
          <Icon svg="spread" />
        </div>
        <div className="col-1of2">
          <p className={titleClassName}>
            Monitor misinformation spread
          </p>
          <br />
          <p className={subtitleClassName}>
            Identify who spreads misinformation online
          </p>
          <p className={subtitleClassName}>
            Aggregate track record of credibility by information sources
          </p>
        </div>
      </section>

    </Main>
  </Fragment>
)

function mapStateToProps(state) {
  return { reviews: state.data.reviews }
}

export default compose(
  connect(mapStateToProps)
)(Home)
