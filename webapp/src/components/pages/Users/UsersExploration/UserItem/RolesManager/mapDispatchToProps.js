import { requestData } from 'redux-saga-data'

const mapDispatchToProps = dispatch => ({
  requestGetRoleTypes: () => dispatch(requestData({ apiPath: '/roleTypes' }))
})

export default mapDispatchToProps
