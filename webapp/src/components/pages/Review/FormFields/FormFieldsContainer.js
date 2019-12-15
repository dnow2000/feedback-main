import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withForm from 'with-react-form'

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
  withForm,
  connect(mapStateToProps)
)(FormFields)
