import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectEntitiesByKeyAndJoin } from 'redux-thunk-data'
import { selectCurrentUser } from 'with-react-redux-login'

import ArticleItem from './ArticleItem'
import selectCurrentUserReviewByArticleId from 'selectors/selectCurrentUserReviewByArticleId'
import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'

const mapStateToProps = (state, ownProps) =>  {
  const { article } = ownProps
  const { id: articleId } = article || {}
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectRoleByUserIdAndType(state, currentUserId, 'editor')
  const reviewerRole = selectRoleByUserIdAndType(state, currentUserId, 'reviewer')

  const canDelete = typeof editorRole !== 'undefined'
  const canReview = typeof reviewerRole !== 'undefined'
  const canVerdict = typeof editorRole !== 'undefined'

  const currentUserReview = selectCurrentUserReviewByArticleId(state, articleId)

  const reviews = selectEntitiesByKeyAndJoin(state, 'reviews', 'articleId', articleId)
  const hasReviews = reviews && reviews.length > 0
  const showSeeAllReviews = typeof editorRole !== 'undefined' && hasReviews

  const verdict = selectEntitiesByKeyAndJoin(state, 'verdicts', 'articleId', articleId)[0]

  return {
    article,
    canDelete,
    canReview,
    canVerdict,
    currentUserReview,
    verdict,
    hasReviews,
    showSeeAllReviews
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ArticleItem)
