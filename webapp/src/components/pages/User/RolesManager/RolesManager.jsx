import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { requestData } from 'redux-thunk-data'

class RolesManager extends PureComponent {
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

export default RolesManager
