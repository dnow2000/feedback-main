import {
  selectEvaluationsByType,
  selectTagsByScopes
} from '../../../../selectors'

function mapStateToProps(state) {
  return {
    evaluations: selectEvaluationsByType(state, 'article'),
    tags: selectTagsByScopes(state, ['verdict'])
  }
}

export default mapStateToProps
