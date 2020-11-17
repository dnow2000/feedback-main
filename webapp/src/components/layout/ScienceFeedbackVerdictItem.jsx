import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectEntityByKeyAndId } from 'redux-thunk-data'
import { createSelector } from 'reselect'

import Avatar from 'components/layout/Avatar'
import ContentItem from 'components/layout/ContentItem'
import selectReviewsByContentIdAndVerdictId from 'selectors/selectReviewsByContentIdAndVerdictId'
import ratings, {
  getBarSizeByValue,
  getColorClassName,
  getMeanRating,
  RATING_VALUES,
  round
} from 'utils/ratings'


const barSizeByValue = getBarSizeByValue(ratings)
const meanRating = getMeanRating(ratings)
const colorClassName = getColorClassName(meanRating)


const MAX_AVATARS = 5
const selectTruncatedReviewers = createSelector(
  selectReviewsByContentIdAndVerdictId,
  reviews => {
    if (!reviews) return
    const reviewers = reviews.map(review => review.reviewer)
    if (reviewers.length <= MAX_AVATARS) {
      return reviewers
    }
    const reviewersToShow = reviewers.slice(0, MAX_AVATARS)
    const fakeReviewer = {number: reviewers.length - reviewersToShow.length}
    return [
      ...reviewersToShow,
      fakeReviewer
    ]
  }
)


const _ = ({ verdict }) => {
  const {
    contentId,
    editorId,
    id: verdictId
  } = verdict


  const content = useSelector(state =>
    selectEntityByKeyAndId(state, 'contents', contentId))

  const truncatedReviewers = useSelector(state =>
    selectTruncatedReviewers(state, contentId, verdictId))

  const editor = useSelector(state =>
    selectEntityByKeyAndId(state, 'users', editorId))


  return (
    <div className="science-feedback-verdict-item">
      {content && (
        <ContentItem
          content={content}
          withShares={false}
        />)}
      <div className="verdict-bottom">
        <div className="verdict-mean">
          <div className={colorClassName}>
            {meanRating}
          </div>
        </div>
        <div className="verdict-counts">
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
        <div className="verdict-users">
          <div className="verdict-editor">
            <p className="editor-title">
              {'Editor'}
            </p>
            <Avatar
              className="avatar editor-avatar"
              user={editor}
            />
          </div>
          <div className="verdict-reviewers">
            <p className="reviewer-title">
              {'Reviewers'}
            </p>
            {(truncatedReviewers || []).map(reviewer => (
              <Avatar
                className="avatar reviewer-avatar"
                key={reviewer.id}
                number={reviewer.number}
                user={reviewer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

_.propTypes = {
  verdict: PropTypes.shape({
    contentId: PropTypes.number,
    editorId: PropTypes.number,
    id: PropTypes.number.isRequired
  }).isRequired
}

export default _
