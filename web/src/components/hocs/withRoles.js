import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { selectNewOrEditEntityContextFromLocation } from '../form/utils'
import { selectCurrentRolesByTypes } from '../../selectors'

export const withRoles = (config = {
  accessRoleTypes: [],
  createRoleTypes: [],
  editRoleTypes: []
}) => WrappedComponent => {

  class _withRoles extends PureComponent {
    constructor() {
      super()
      this.state = { canRenderChildren: false }
    }

    componentDidMount = () => {
      this.renderWhenNewOrEditRoles()
    }

    componentDidUpdate = () => {
      this.renderWhenNewOrEditRoles()
    }

    renderWhenNewOrEditRoles = () => {
      const {
        accessRoles,
        editRoles,
        history,
        location,
        createRoles
      } = this.props
      const {
        isEditEntity,
        isNewEntity,
        originLocationString
      } = selectNewOrEditEntityContextFromLocation(location)
      const { canRenderChildren } = this.state

      if (canRenderChildren) {
        return
      }

      if (isNewEntity) {
        if (createRoles.length) {
          this.setState({ canRenderChildren: true })
          return
        }
        history.push(originLocationString)
      }

      if (isEditEntity) {
        if (editRoles.length) {
          this.setState({ canRenderChildren: true })
          return
        }
        history.push(originLocationString)
      }

      if (!isNewEntity && !isEditEntity) {

        if (accessRoles) {
          if (accessRoles.length) {
            this.setState({ canRenderChildren: true })
            return
          }
          history.push(originLocationString)
        }

        this.setState({ canRenderChildren: true })
      }

    }

    render() {
      const { canRenderChildren } = this.state
      if (!canRenderChildren) {
        return null
      }
      return <WrappedComponent {...this.props} />
    }
  }

  _withRoles.defaultProps = {
    currentUser: null,
  }

  _withRoles.propTypes = {
    currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  function mapStateToProps (state) {
    const accessRoles = selectCurrentRolesByTypes(state, config.accessRoles)
    const createRoles = selectCurrentRolesByTypes(state, config.createRoleTypes)
    const editRoles = selectCurrentRolesByTypes(state, config.editRoleTypes)
    return {
      accessRoles,
      createRoles,
      editRoles
    }
  }

  return compose(
    withRouter,
    connect(mapStateToProps)
  )(_withRoles)
}

export default withRoles
