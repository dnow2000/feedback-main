import classnames from 'classnames'
import PropTypes from 'prop-types'
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
)


export default ({ verdict }) => {
  const {
    articleId,
    id: verdictId,
    userId: editorId
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
            {(truncatedReviewers || []).map(user => (
              <Avatar
                className="avatar reviewer-avatar"
                key={user.id}
                number={user.number}
                user={user}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
