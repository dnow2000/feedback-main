import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import selectVerdictsByArticleId from 'selectors/selectVerdictsByArticleId'

import Verdicts from './Verdicts'

const mapStateToProps = (state, ownProps) => {
  const { query } = ownProps
  const queryParams = query.getParams()
  const { articleId } = queryParams
  return {
    verdicts: articleId
      ? selectVerdictsByArticleId(state, articleId)
      : state.data.verdicts
  }
}

export default compose(
  withRouter,
  withRequiredLogin,
  connect(mapStateToProps)
)(Verdicts)
