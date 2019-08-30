import { connect } from 'react-redux'
import { requestData } from 'redux-saga-data'

import RolesManager from './RolesManager'

const mapStateToProps = state => ({
  roleTypes: state.data.roleTypes
})

const mapDispatchToProps = dispatch => ({
  requestGetRoleTypes: () => dispatch(requestData({ apiPath: '/roleTypes' }))
})

export default connect(mapStateToProps, mapDispatchToProps)(RolesManager)
