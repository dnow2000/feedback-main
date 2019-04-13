import { selectCurrentUser } from 'with-react-login'

import {
  selectEligibleVerdictUsersByVerdictId
} from '../../../../selectors'

function mapStateToProps(state, ownProps) {
  const { match: { params: { verdictId } } } = ownProps
  return {
    currentUser: selectCurrentUser(state),
    users: selectEligibleVerdictUsersByVerdictId(state, verdictId),
  }
}

export default mapStateToProps
