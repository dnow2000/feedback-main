import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectCurrentUser } from 'with-react-redux-login'

import withFormRouter from 'components/hocs/withFormRouter/withFormRouter'
import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'
import selectCurrentUserReviewByArticleId from 'selectors/selectCurrentUserReviewByArticleId'

import FormFooter from './FormFooter'

const mapStateToProps = (state, ownProps) =>  {
  const {
    match: { params: { articleId } },
  } = ownProps
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectRoleByUserIdAndType(state, currentUserId, 'editor')
  const reviewerRole = selectRoleByUserIdAndType(state, currentUserId, 'reviewer')

  const canReview = typeof reviewerRole !== 'undefined'
  const canEdit = typeof editorRole !== 'undefined'

  return {
    canEdit,
    canReview,
    review: selectCurrentUserReviewByArticleId(state, articleId)
  }
}

export default compose(
  withFormRouter,
  connect(mapStateToProps)
)(FormFooter)
