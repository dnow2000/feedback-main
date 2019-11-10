import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'
import selectArticleIdByMatchAndQuery from 'selectors/selectArticleIdByMatchAndQuery'
import selectArticleById from 'selectors/selectArticleById'

import Verdict from './Verdict'
import selectCurrentUserVerdictPatchByArticleId from './selectors/selectCurrentUserVerdictPatchByArticleId'

const mapStateToProps = (state, ownProps) =>  {
  const articleId = selectArticleIdByMatchAndQuery(
    state,
    ownProps.match,
    ownProps.query
  )
  const currentUserVerdictPatch = selectCurrentUserVerdictPatchByArticleId(state, articleId)
  return {
    article: selectArticleById(state, articleId),
    currentUserVerdictPatch,
  }
}

export default compose(
  withQueryRouter(),
  withRequiredLogin,
  withRoles({
    creationRoleTypes: ['editor'],
    modificationRoleTypes: ['editor']
  }),
  connect(mapStateToProps)
)(Verdict)
