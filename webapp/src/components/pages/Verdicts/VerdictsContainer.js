import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import selectVerdictsByArticleId from 'selectors/selectVerdictsByArticleId'

import Verdicts from './Verdicts'

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
  withQueryRouter(),
  withRequiredLogin,
  connect(mapStateToProps)
)(Verdicts)
