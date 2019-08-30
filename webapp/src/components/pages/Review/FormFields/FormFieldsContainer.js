import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import FormFields from './FormFields'
import {
  selectEvaluationsByType,
  selectTagsByScopes
} from '../../../../selectors'


const mapStateToProps = state =>  {
  return {
    evaluations: selectEvaluationsByType(state, 'article'),
    tags: selectTagsByScopes(state, ['review'])
  }
}

export default compose(
  withQueryRouter(),
  connect(mapStateToProps)
)(FormFields)
