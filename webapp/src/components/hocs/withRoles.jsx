import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import selectCurrentRolesByTypes from 'selectors/selectCurrentRolesByTypes'

export default (config = {
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
        form,
        history,
        modificationRoles,
      } = this.props
      const {
        getReadOnlyUrl,
        isCreatedEntity,
        isModifiedEntity
      } = form
      const { canRenderChildren } = this.state

      if (canRenderChildren) {
        return
      }

      if (isCreatedEntity) {
        if (creationRoles.length) {
          this.setState({ canRenderChildren: true })
          return
        }
        history.push(getReadOnlyUrl())
      }

      if (isModifiedEntity) {
        if (modificationRoles.length) {
          this.setState({ canRenderChildren: true })
          return
        }
        history.push(getReadOnlyUrl())
      }

      if (!isCreatedEntity && !isModifiedEntity) {
        if (accessRoles) {
          if (accessRoles.length) {
            this.setState({ canRenderChildren: true })
            return
          }
          history.push(getReadOnlyUrl())
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
    form: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    modificationRoles: PropTypes.arrayOf(PropTypes.shape())
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
