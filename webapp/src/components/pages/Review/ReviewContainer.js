import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'
import { selectCurrentUser } from 'with-react-redux-login'
import withForm from 'with-react-form'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'
import selectArticleIdByMatchAndQuery from 'selectors/selectArticleIdByMatchAndQuery'
import selectArticleById from 'selectors/selectArticleById'

import Review from './Review'
import selectFormInitialValuesByArticleId from './selectors/selectFormInitialValuesByArticleId'
import selectVerdictsByArticleIdAndByUserId from './selectors/selectVerdictsByArticleIdAndByUserId'

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
  withForm,
  withRoles({ creationRoleTypes: ['reviewer'], modificationRoleTypes: ['reviewer'] }),
  connect(mapStateToProps)
)(Review)
