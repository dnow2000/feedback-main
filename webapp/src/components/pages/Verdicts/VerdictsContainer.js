import { connect } from 'react-redux'
import { compose } from 'redux'

import Verdicts from './Verdicts'
import withRequiredLogin from '../../hocs/withRequiredLogin'
import selectVerdictsByArticleId from '../../../selectors/selectVerdictsByArticleId'

function mapStateToProps (state, ownProps) {
  const { query } = ownProps
  const queryParams = query.parse()
  const { articleId } = queryParams
  return {
    verdicts: articleId
      ? selectVerdictsByArticleId(state, articleId)
      : state.data.verdicts
  }
}

export default compose(
  withRequiredLogin,
  connect(mapStateToProps)
)(Verdicts)
