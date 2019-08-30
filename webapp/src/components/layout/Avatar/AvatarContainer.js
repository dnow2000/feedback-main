import { connect } from 'react-redux'
import { selectCurrentUser } from 'with-react-redux-login'

import Avatar from './Avatar'

const mapStateToProps = (state, ownProps) =>  {
  return {
    user: ownProps.user || selectCurrentUser(state),
  }
}

export default connect(mapStateToProps)(Avatar)
