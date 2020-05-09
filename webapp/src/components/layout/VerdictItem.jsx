import classnames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectEntityByKeyAndId } from 'redux-thunk-data'
import { createSelector } from 'reselect'

import ArticleItem from 'components/layout/ArticleItem'
import Avatar from 'components/layout/Avatar'
import selectReviewsByArticleIdAndVerdictId from 'selectors/selectReviewsByArticleIdAndVerdictId'
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
  selectReviewsByArticleIdAndVerdictId,
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


export default ({ verdict }) => {
  const {
    articleId,
    editorId,
    id: verdictId
  } = verdict


  const article = useSelector(state =>
    selectEntityByKeyAndId(state, 'articles', articleId))

  const truncatedReviewers = useSelector(state =>
    selectTruncatedReviewers(state, articleId, verdictId))

  const editor = useSelector(state =>
    selectEntityByKeyAndId(state, 'users', editorId))


  return (
    <div className="verdict-item">
      {article && (
        <ArticleItem
          article={article}
          withShares={false}
        />)}
      <div className="verdict-bottom-container">
        <div className="mean-container">
          <div className={classnames("mean", colorClassName)}>
            {meanRating}
          </div>
        </div>
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
        <div className="users-container">
          <div className="editor-container">
            <p className="editor-title">Editor</p>
            <Avatar
              className="avatar editor-avatar"
              user={editor}
            />
          </div>
          <div className="reviewers-container">
            <p className="reviewer-title">Reviewers</p>
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
