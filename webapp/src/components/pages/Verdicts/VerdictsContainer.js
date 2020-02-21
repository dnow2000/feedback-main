import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withQuery from 'with-react-query'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import selectVerdictsByArticleId from 'selectors/selectVerdictsByArticleId'

import Verdicts from './Verdicts'

const mapStateToProps = (state, ownProps) => {
  const { query: { params: { articleId } } } = ownProps
  return {
    verdicts: articleId
      ? selectVerdictsByArticleId(state, articleId)
      : state.data.verdicts
  }
}

export default compose(
  withRouter,
  withQuery(),
  withRequiredLogin,
  connect(mapStateToProps)
)(Verdicts)
