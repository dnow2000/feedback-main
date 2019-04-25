import { selectCurrentUser } from 'with-react-redux-login'

import {
  selectEditorRoleByUserId,
  selectReviewerRoleByUserId,
  selectCurrentUserReviewByArticleId
} from '../../../../selectors'

function mapStateToProps(state, ownProps) {
  const {
    match: { params: { articleId } },
  } = ownProps
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectEditorRoleByUserId(state, currentUserId)
  const reviewerRole = selectReviewerRoleByUserId(state, currentUserId)

  const canReview = typeof reviewerRole !== 'undefined'
  const canEdit = typeof editorRole !== 'undefined'

  return {
    canEdit,
    canReview,
    review: selectCurrentUserReviewByArticleId(state, articleId)
  }
}

export default mapStateToProps
