import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import { selectCurrentRolesByTypes } from '../../selectors'

export const withRoles = (config = {
  accessRoleTypes: [],
  creationUserRoleTypes: [],
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
        modificationRoles,
        history,
        creationRoles,
        query
      } = this.props
      const {
        isModifiedEntity,
        isCreationEntity,
        originLocationString
      } = query.context()
      const { canRenderChildren } = this.state

      if (canRenderChildren) {
        return
      }

      if (isCreationEntity) {
        if (creationRoles.length) {
          this.setState({ canRenderChildren: true })
          return
        }
        history.push(originLocationString)
      }

      if (isModifiedEntity) {
        if (modificationRoles.length) {
          this.setState({ canRenderChildren: true })
          return
        }
        history.push(originLocationString)
      }

      if (!isCreationEntity && !isModifiedEntity) {

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
    const accessRoles = selectCurrentRolesByTypes(state, config.accessRoles)
    const creationRoles = selectCurrentRolesByTypes(state, config.creationRoleTypes)
    const modificationRoles = selectCurrentRolesByTypes(state, config.modificationRoleTypes)
    return {
      accessRoles,
      creationRoles,
      modificationRoles
    }
  }

  return compose(
    withQueryRouter(),
    connect(mapStateToProps)
  )(_withRoles)
}

export default withRoles
