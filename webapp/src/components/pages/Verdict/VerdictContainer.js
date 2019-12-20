import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withForm from 'with-react-form'
import withQuery from 'with-react-query'

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
    isPending: (state.requests['/verdicts'] || {}).isPending
  }
}

export default compose(
  withRouter,
  withQuery(),
  withRequiredLogin,
  withForm,
  withRoles({
    creationRoleTypes: ['editor'],
    modificationRoleTypes: ['editor']
  }),
  connect(mapStateToProps)
)(Verdict)
