import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import selectEvaluationsByType from 'selectors/selectEvaluationsByType'
import selectTagsByScopes from 'selectors/selectTagsByScopes'

import FormFields from './FormFields'

const mapStateToProps = state =>  {
  return {
    evaluations: selectEvaluationsByType(state, 'article'),
    tags: selectTagsByScopes(state, ['verdict'])
  }
}

export default compose(
  withQueryRouter(),
  connect(mapStateToProps)
)(FormFields)
