import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectCurrentUser } from 'with-react-redux-login'

import Article from './Article'
import { withRequiredLogin, withRoles } from '../../hocs'
import {
  selectArticleById,
  selectCurrentUserReviewByArticleId,
  selectRoleByUserIdAndType,
  selectReviewsByArticleIdAndVerdictId,
  selectVerdictsByArticleId,
} from '../../../selectors'


const mapStateToProps = (state, ownProps) => {
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

export default compose(
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['editor'], modificationRoleTypes: ['editor'] }),
  connect(mapStateToProps)
)(Article)
