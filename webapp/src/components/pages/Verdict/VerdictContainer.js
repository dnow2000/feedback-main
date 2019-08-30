import { connect } from 'react-redux'
import { compose } from 'redux'

import Verdict from './Verdict'
import { withRequiredLogin, withRoles } from '../../hocs'
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
  withRequiredLogin,
  withRoles({
    creationRoleTypes: ['editor'],
    modificationRoleTypes: ['editor']
  }),
  connect(mapStateToProps)
)(Verdict)
