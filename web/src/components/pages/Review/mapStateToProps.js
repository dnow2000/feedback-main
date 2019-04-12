import { selectCurrentUser } from 'with-react-login'

import {
  selectArticleById,
  getArticleIdByMatchAndQuery,
  selectCurrentUserReviewPatchByArticleId,
  selectVerdictsByArticleIdAndByUserId
} from '../../../selectors'

function mapStateToProps(state, ownProps) {
  const articleId = getArticleIdByMatchAndQuery(
    state,
    ownProps.match,
    ownProps.location
  )
  const currentUserReviewPatch = selectCurrentUserReviewPatchByArticleId(state, articleId)
  const currentUser = selectCurrentUser(state)
  const { id: userId } = (currentUser || {})
  return {
    article: selectArticleById(state, articleId),
    currentUserReviewPatch,
    verdicts: selectVerdictsByArticleIdAndByUserId(state, articleId, userId)
  }
}

export default mapStateToProps
