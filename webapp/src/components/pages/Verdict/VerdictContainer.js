import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import Verdict from './Verdict'
import withRequiredLogin from '../../hocs/withRequiredLogin'
import withRoles from '../../hocs/withRoles'
import selectCurrentUserVerdictPatchByArticleId from './selectors/selectCurrentUserVerdictPatchByArticleId'
import selectArticleIdByMatchAndQuery from '../../../selectors/selectArticleIdByMatchAndQuery'
import selectArticleById from '../../../selectors/selectArticleById'

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
