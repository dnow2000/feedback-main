import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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
    tags: selectTagsByScopes(state, ['verdict'])
  }
}

export default compose(
  withQueryRouter(),
  connect(mapStateToProps)
)(FormFields)
