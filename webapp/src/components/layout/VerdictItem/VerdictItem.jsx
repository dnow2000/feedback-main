import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Dotdotdot from 'react-dotdotdot'
import { NavLink } from 'react-router-dom'

import ArticleItemContainer from 'components/layout/ArticleItem/ArticleItemContainer'
import Avatar from 'components/layout/Avatar'
import ReviewItemContainer from 'components/pages/Reviews/ReviewsExploration/ReviewItem/ReviewItemContainer'


const RATING_VALUES = ['2', '1', '0', '-1', '-2', 'na']
const MAX_AVATARS = 5

function getMeanRating(ratings) {
  const ratingsNotNull = ratings.filter(r => r !== null)
  const sum = ratingsNotNull.reduce((acc, rating) => acc + rating, 0)
  const mean = ratingsNotNull.length > 0
    ? sum / ratingsNotNull.length
    : null
  return mean
}

function getBarSizeByValue_DEPRECATE(ratings) {  // eslint-disable-line
  const countsByValue = getRatingsCountByValue(ratings)
  const totalCount = Object.values(countsByValue).reduce((acc, c) => acc + c, 0)
  const lagSize = 6
  const maxSize = 30
  const barSizeByValue = {}
  for (const value of Object.keys(countsByValue)) {
    barSizeByValue[value] = lagSize + countsByValue[value] / totalCount * (maxSize - lagSize)
  }
  console.log('BAR SIZES', barSizeByValue)
  return barSizeByValue
}

function getBarSizeByValue(ratings) {
  const countsByValue = getRatingsCountByValue(ratings)
  const maxCount = Object.values(countsByValue).reduce((acc, c) => acc > c ? acc : c, 0)
  const lagSize = 6
  const maxSize = 30
  const step = (maxSize - lagSize) / maxCount
  const barSizeByValue = {}
  for (const value of Object.keys(countsByValue)) {
    barSizeByValue[value] = lagSize + countsByValue[value] * step
  }
  return barSizeByValue
}


function getRatingsCountByValue(ratings) {
  const ratingsCountByValue = {}
  for (const value of RATING_VALUES) {
    ratingsCountByValue[value] = 0
  }
  for (const rating of ratings) {
    const value = rating !== null
      ? `${rating}`
      : 'na'
    ratingsCountByValue[value] = ratingsCountByValue[value] + 1
  }
  return ratingsCountByValue
}


function round(x, n=0) {
  return Math.round(x*10**n) / 10**n
}

function getTruncatedReviewers(reviews) {
  if (!reviews) return
  const users = reviews.map(r => r.user)
  if (users.length <= MAX_AVATARS) {
    return users
  }
  const usersToShow = users.slice(0, MAX_AVATARS)
  const fakeUser = {number: users.length - usersToShow.length}
  return [
    ...usersToShow,
    fakeUser
  ]

}


const VerdictItem = ({ article, verdict, user }) => {
  const { title, url } = article || {}
  const { comment, id, rating, user: editor, reviews } = verdict
  const { publicName } = user || {}

  // XXX @quentin: put back first line and remove second line when done testing
  // const ratings = reviews.map(r => r.rating)
  const ratings = [-2, -2, -2, 0, 1, 1, 2, 2, 2, 2, null]

  const meanRating = getMeanRating(ratings)
  let colorClassName
  if (meanRating == null) {
    colorClassName = "na"
  } else if (meanRating >= 1) {
    colorClassName = "positive"
  } else if (meanRating >= 0) {
    colorClassName = "neutral"
  } else {
    colorClassName = "negative"
  }
  const barSizeByValue = getBarSizeByValue(ratings)

  return (
    <div className="verdict-item">
      {article && (
        <ArticleItemContainer
          article={article}
          withShares={false}
        />)}
      <div className="verdict-bottom-container">
        <div className="col-tablet-20">
          <div className="mean-container">
            <div className={classnames("mean", colorClassName)}>
              {meanRating}
            </div>
          </div>
        </div>
        <div className="col-tablet-15">
          <div className="counts-container">
            {RATING_VALUES.map(value => {
              const width = round(barSizeByValue[value], 2)
              return (
                <div
                  className={classnames("bar", `bar-${value}`)}
                  key={value}
                  style={{width: `${width}px`}}
                />
              )
            })}
          </div>
        </div>
        <div className="col-tablet-65">
          <div className="users-container">
            <div className="col-tablet-20">
              <div>Editor</div>
              <Avatar
                  className="avatar editor-avatar"
                user={editor}
              />
            </div>
            <div className="col-tablet-80">
              <div>Reviewers</div>
              <div className="reviewers-container">
                {(getTruncatedReviewers(reviews) || []).map(user => {
                  return (
                    <Avatar
                      className="avatar reviewer-avatar"
                      key={user.id}
                      number={user.number}
                      user={user}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
