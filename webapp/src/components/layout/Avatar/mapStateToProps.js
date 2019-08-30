import { selectCurrentUser } from 'with-react-redux-login'

const mapStateToProps = (state, ownProps) =>  {
  return {
    user: ownProps.user || selectCurrentUser(state),
  }
}

export default mapStateToProps
