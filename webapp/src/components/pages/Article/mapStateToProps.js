import { selectCurrentUser } from 'with-react-redux-login'

import {
  selectArticleById,
  selectCurrentUserReviewByArticleId,
  selectRoleByUserIdAndType,
  selectReviewsByArticleIdAndVerdictId,
  selectVerdictsByArticleId,
} from '../../../selectors'

function mapStateToProps(state, ownProps) {
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = (currentUser || {})
  const { match } = ownProps
  const { params: { articleId } } = match

  const editorRole = selectRoleByUserIdAndType(state, currentUserId, 'editor')
  const reviewerRole = selectRoleByUserIdAndType(state, currentUserId, 'reviewer')

  const canCreateArticle = typeof editorRole !== 'undefined'
  const canReview = typeof reviewerRole !== 'undefined'

  return {
    article: selectArticleById(state, articleId),
    canCreateArticle,
    canReview,
    currentUser,
    reviewerRole,
    userReview: selectCurrentUserReviewByArticleId(state, articleId),
    verdicts: selectVerdictsByArticleId(state, articleId),
    withoutVerdictReviews: selectReviewsByArticleIdAndVerdictId(
      state,
      articleId,
      null
    ),
  }
}

export default mapStateToProps
