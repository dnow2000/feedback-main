import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withForm from 'with-react-form'
import withQuery from 'with-react-query'

import selectArticleById from 'selectors/selectArticleById'
import selectReviewsByArticleId from 'selectors/selectReviewsByArticleId'
import selectEvaluationsByType from 'selectors/selectEvaluationsByType'
import selectTagsByScopes from 'selectors/selectTagsByScopes'

import selectTrendingById from '../../selectors/selectTrendingById'
import selectVerdictById from '../../selectors/selectVerdictById'
import FormFields from './FormFields'


const mapStateToProps = (state, ownProps) =>  {
  const { form, query } = ownProps
  const { trendingId } = query.getParams()
  const trending = selectTrendingById(state, parseInt(trendingId))
  const { id: verdictId } = form
  const verdict = selectVerdictById(state, verdictId)
  const { articleId } = verdict || {}
  const article = selectArticleById(state, articleId)
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
