import { selectCurrentUser } from 'with-react-redux-login'

import {
  selectCurrentUserReviewByArticleId,
  selectCurrentUserVerdictByArticleId,
  selectEditorRoleByUserId,
  selectReviewerRoleByUserId,
  selectReviewsByArticleId
} from '../../../../selectors'

function mapStateToProps(state, ownProps) {
  const { article } = ownProps
  const { id: articleId } = article || {}
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectEditorRoleByUserId(state, currentUserId)
  const reviewerRole = selectReviewerRoleByUserId(state, currentUserId)

  const canDelete = typeof editorRole !== 'undefined'
  const canReview = typeof reviewerRole !== 'undefined'
  const canVerdict = typeof editorRole !== 'undefined'

  const currentUserReview = selectCurrentUserReviewByArticleId(state, articleId)

  const reviews = selectReviewsByArticleId(state, articleId)
  const hasReviews = reviews && reviews.length > 0
  const showSeeAllReviews = typeof editorRole !== 'undefined' && hasReviews

  const currentUserVerdict = selectCurrentUserVerdictByArticleId(state, articleId)

  return {
    canDelete,
    canReview,
    canVerdict,
    currentUserReview,
    currentUserVerdict,
    hasReviews,
    showSeeAllReviews
  }
}

export default mapStateToProps
