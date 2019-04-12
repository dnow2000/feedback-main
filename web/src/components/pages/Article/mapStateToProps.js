import { selectCurrentUser } from 'with-react-login'

import {
  selectArticleById,
  selectEditorRoleByUserId,
  selectCurrentUserReviewByArticleId,
  selectReviewerRoleByUserId,
  selectReviewsByArticleIdAndVerdictId,
  selectVerdictsByArticleId,
} from '../../../selectors'

function mapStateToProps(state, ownProps) {
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = (currentUser || {})
  const { match } = ownProps
  const { params: { articleId } } = match

  const editorRole = selectEditorRoleByUserId(state, currentUserId)
  const reviewerRole = selectReviewerRoleByUserId(state, currentUserId)

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
