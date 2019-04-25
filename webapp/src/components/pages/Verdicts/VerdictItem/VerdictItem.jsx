import PropTypes from 'prop-types'
import React from 'react'
import Dotdotdot from 'react-dotdotdot'
import { NavLink } from 'react-router-dom'

import ReviewItemContainer from '../../Reviews/ReviewsExploration/ReviewItem/ReviewItemContainer'

const VerdictItem = ({ article, verdict, reviews, user }) => {
  const { title, url } = article || {}
  const { comment, id, rating } = verdict
  const { publicName } = user || {}

  return (
    <article className="box">
      <div className="flex-columns items-center mb12">
        <div className="col-25 text-center mr12">
          <figure className="image is-64x64">
            {rating}
          </figure>
        </div>
      </div>
      <div className="media-content">
        <div className="content">
          <a href={url} rel="noopener noreferrer" target="_blank">
            <strong>
              {title}
            </strong>
          </a>
          <p>
            {publicName}
          </p>
          <br />
          <br />
          <Dotdotdot className="is-small is-italic" clamp={3}>
            {comment}
          </Dotdotdot>
        </div>
        <br />

        {reviews.length > 0 ? (
          <div>
            <p className="title">
Reviews
            </p>
            {reviews.map(review => (
              <div className="box" key={review.id}>
                <ReviewItemContainer review={review} />
              </div>
            ))}
          </div>
        ) : (
          <div>
Wating for reviews...
          </div>
        )}

        <br />
        <br />
        <nav className="level is-mobile">
          <div className="level-left">
            <NavLink
              className="button is-primary"
              to={`/verdicts/${id}`}
            >
              See Verdict
            </NavLink>
          </div>
        </nav>
      </div>
    </article>
  )
}

VerdictItem.defaultProps = {
  article: null,
  reviews: null,
  user: null,
  verdict: null,
}

VerdictItem.propTypes = {
  article: PropTypes.object,
  reviews: PropTypes.array,
  user: PropTypes.object,
  verdict: PropTypes.object,
}

export default VerdictItem
