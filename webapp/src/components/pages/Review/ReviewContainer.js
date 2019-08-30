import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectCurrentUser } from 'with-react-redux-login'

import Review from './Review'
import selectFormInitialValuesByArticleId from './selectors/selectFormInitialValuesByArticleId'
import selectVerdictsByArticleIdAndByUserId from './selectors/selectVerdictsByArticleIdAndByUserId'
import { withRequiredLogin, withRoles } from '../../hocs'
import selectArticleIdByMatchAndQuery from '../../../selectors/selectArticleIdByMatchAndQuery'
import selectArticleById from '../../../selectors/selectArticleById'

const mapStateToProps = (state, ownProps) =>  {
  const articleId = selectArticleIdByMatchAndQuery(
    state,
    ownProps.match,
    ownProps.query
  )

  const formInitialValues = selectFormInitialValuesByArticleId(state, articleId)
  const currentUser = selectCurrentUser(state)
  const { id: userId } = (currentUser || {})
  return {
    article: selectArticleById(state, articleId),
    formInitialValues,
    verdicts: selectVerdictsByArticleIdAndByUserId(state, articleId, userId)
  }
}

export default compose(
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['reviewer'], modificationRoleTypes: ['reviewer'] }),
  connect(mapStateToProps)
)(Review)
