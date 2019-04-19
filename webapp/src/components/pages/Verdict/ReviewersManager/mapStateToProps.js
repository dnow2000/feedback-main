import { selectUsersByVerdictId } from '../../../../selectors'

function mapStateToProps (state, ownProps) {
  const { match: { params: { verdictId } } } = ownProps
  return {
    verdictUsers: selectUsersByVerdictId(state, verdictId)
  }
}

export default mapStateToProps
