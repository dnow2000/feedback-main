function mapStateToProps (state) {
  return {
    isNavigationActive: state.navigation.isActive
  }
}

export default mapStateToProps
