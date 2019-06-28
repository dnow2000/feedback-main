import selectPublicationsByUserId from './selectPublicationsByUserId'

const mapStateToProps = (state, ownProps) => {
  const { user } = ownProps
  const { id: userId } = user
  return {
    publications: selectPublicationsByUserId(state, userId)
  }
}

export default mapStateToProps
