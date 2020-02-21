import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withFormidable from 'with-react-formidable'

import selectEvaluationsByType from 'selectors/selectEvaluationsByType'
import selectTagsByScopes from 'selectors/selectTagsByScopes'

import FormFields from './FormFields'

const mapStateToProps = state =>  {
  return {
    evaluations: selectEvaluationsByType(state, 'article'),
    tags: selectTagsByScopes(state, ['review'])
  }
}

export default compose(
  withRouter,
  withFormidable,
  connect(mapStateToProps)
)(FormFields)
