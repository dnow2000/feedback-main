import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectEntityByKeyAndId, selectEntitiesByKeyAndJoin } from 'redux-thunk-data'
import withForm from 'with-react-form'
import withQuery from 'with-react-query'

import selectArticleById from 'selectors/selectArticleById'
import selectReviewsByArticleId from 'selectors/selectReviewsByArticleId'
import selectEvaluationsByType from 'selectors/selectEvaluationsByType'
import selectTagsByScopes from 'selectors/selectTagsByScopes'

import FormFields from './FormFields'


const mapStateToProps = (state, ownProps) =>  {
  const { match: { params: { verdictId } }, query } = ownProps
  const { buzzsumoId } = query.getParams()
  const trending = selectEntitiesByKeyAndJoin(state, 'trendings', 'buzzsumoId', buzzsumoId)[0]
  const verdict = selectEntityByKeyAndId(state, 'verdicts', verdictId)
  const { articleId } = verdict || {}
  const article = selectEntityByKeyAndId(state, 'articles', articleId)
  const reviews = selectReviewsByArticleId(state, articleId)
  return {
    article,
    evaluations: selectEvaluationsByType(state, 'article'),
    tags: selectTagsByScopes(state, ['verdict']),
    reviews,
    trending,
  }
}

export default compose(
  withRouter,
  withForm,
  withQuery(),
  connect(mapStateToProps)
)(FormFields)
