import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withForm from 'with-react-form'
import withQuery from 'with-react-query'
import { selectCurrentUser } from 'with-react-redux-login'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'
import withFormRouter from 'components/hocs/withFormRouter/withFormRouter'
import selectArticleById from 'selectors/selectArticleById'
import selectCurrentUserReviewByArticleId from 'selectors/selectCurrentUserReviewByArticleId'
import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'
import selectReviewsByArticleIdAndVerdictId from 'selectors/selectReviewsByArticleIdAndVerdictId'
import selectVerdictsByArticleId from 'selectors/selectVerdictsByArticleId'

import Article from './Article'

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
    )
  }
}

export default compose(
  withRouter,
  withQuery(),
  withForm,
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['editor'], modificationRoleTypes: ['editor'] }),
  connect(mapStateToProps)
)(Article)
