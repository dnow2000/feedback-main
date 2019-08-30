import { selectCurrentUser } from 'with-react-redux-login'

const mapStateToProps = state =>  {
  return {
    currentUser: selectCurrentUser(state),
  }
}

export default mapStateToProps
