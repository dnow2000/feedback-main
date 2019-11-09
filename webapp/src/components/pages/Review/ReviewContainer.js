import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'
import { selectCurrentUser } from 'with-react-redux-login'

import Review from './Review'
import selectFormInitialValuesByArticleId from './selectors/selectFormInitialValuesByArticleId'
import selectVerdictsByArticleIdAndByUserId from './selectors/selectVerdictsByArticleIdAndByUserId'
import withRequiredLogin from '../../hocs/withRequiredLogin'
import withRoles from '../../hocs/withRoles'
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
  withQueryRouter(),
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['reviewer'], modificationRoleTypes: ['reviewer'] }),
  connect(mapStateToProps)
)(Review)
