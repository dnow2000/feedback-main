import {
  selectArticleById,
  getArticleIdByMatchAndQuery,
  selectCurrentUserVerdictPatchByArticleId,
} from '../../../selectors'

function mapStateToProps(state, ownProps) {
  const articleId = getArticleIdByMatchAndQuery(
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

export default mapStateToProps
