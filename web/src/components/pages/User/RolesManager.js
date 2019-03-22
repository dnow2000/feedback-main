import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'

import { selectRoleByUserIdAndType } from '../../../selectors'

class RolesManager extends Component {
  componentDidMount () {
    this.handleRequestData()
  }

  handleRequestData = () => {
    const { dispatch } = this.props
    dispatch(requestData({ apiPath: '/roleTypes' }))
  }

  onRoleChange = () => {

  }

  render () {
    const { roleTypes, ...rolesByType } = this.props

    if (!roleTypes) {
      return null
    }

    console.log('roleTypes', roleTypes)
    console.log('rolesByType', rolesByType)

    return (
      <div>
        {roleTypes.map(({ value }) => (
          <input
            checked={rolesByType[value]}
            key={value}
            onChange={this.onRoleChange}
            type='checkbox'
          />
        ))}
      </div>
    )
  }
}

RolesManager.defaultProps = {
  roleTypes: null
}

RolesManager.propTypes = {
  dispatch: PropTypes.func.isRequired,
  roleTypes: PropTypes.array
}

function mapStateToProps (state, ownProps) {
  const { data: { roleTypes } } = state
  const { match: { params: { userId } } } = ownProps

  if (!roleTypes) {
    return { roleTypes }
  }

  const rolesByType = {}
  roleTypes.forEach(roleType => {
    rolesByType[roleType] = selectRoleByUserIdAndType(userId, roleType)})

  return {
    roleTypes,
    ...rolesByType
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(RolesManager)
