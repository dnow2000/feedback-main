import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import selectCurrentRolesByTypes from 'selectors/selectCurrentRolesByTypes'

const withRoles = (config = {
  accessRoleTypes: [],
  creationRoleTypes: [],
  modificationRoleTypes: []
}) => WrappedComponent => {

  class _withRoles extends PureComponent {
    constructor() {
      super()
      this.state = { canRenderChildren: false }
    }

    componentDidMount = () => {
      this.renderWhenCreationOrModificationRoles()
    }

    componentDidUpdate = () => {
      this.renderWhenCreationOrModificationRoles()
    }

    renderWhenCreationOrModificationRoles = () => {
      const {
        accessRoles,
        creationRoles,
        modificationRoles,
        query
      } = this.props
      const {
        isCreatedEntity,
        isModifiedEntity
      } = query.context()
      const { canRenderChildren } = this.state

      if (canRenderChildren) {
        return
      }

      if (isCreatedEntity) {
        if (creationRoles.length) {
          this.setState({ canRenderChildren: true })
          return
        }
        query.changeToReadOnly()
      }

      if (isModifiedEntity) {
        if (modificationRoles.length) {
          this.setState({ canRenderChildren: true })
          return
        }
        query.changeToReadOnly()
      }

      if (!isCreatedEntity && !isModifiedEntity) {

        if (accessRoles) {
          if (accessRoles.length) {
            this.setState({ canRenderChildren: true })
            return
          }
          query.changeToReadOnly()
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
    accessRoles: [],
    creationRoles: [],
    currentUser: null,
    modificationRoles: []
  }

  _withRoles.propTypes = {
    accessRoles: PropTypes.arrayOf(PropTypes.shape()),
    creationRoles: PropTypes.arrayOf(PropTypes.shape()),
    currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    history: PropTypes.object.isRequired,
    modificationRoles: PropTypes.arrayOf(PropTypes.shape()),
    query: PropTypes.object.isRequired
  }

  function mapStateToProps (state) {
    const accessRoles = selectCurrentRolesByTypes(state, config.accessRoleTypes)
    const creationRoles = selectCurrentRolesByTypes(state, config.creationRoleTypes)
    const modificationRoles = selectCurrentRolesByTypes(state, config.modificationRoleTypes)
    return {
      accessRoles,
      creationRoles,
      modificationRoles
    }
  }

  return connect(mapStateToProps)(_withRoles)
}

export default withRoles
