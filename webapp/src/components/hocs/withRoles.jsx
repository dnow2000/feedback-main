import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useFormidable } from 'with-react-formidable'

import selectCurrentRolesByTypes from 'selectors/selectCurrentRolesByTypes'

export default (config = {
  accessRoleTypes: [],
  creationRoleTypes: [],
  modificationRoleTypes: []
}) => WrappedComponent =>
  props => {
    const history = useHistory()
    const location = useLocation()
    const params = useParams()
    const {
      getReadOnlyUrl,
      isCreatedEntity,
      isModifiedEntity
    } = useFormidable(location, params)

    const [canRenderChildren, setCanRenderChildren] = useState(false)

    const accessRoles = useSelector(state =>
      selectCurrentRolesByTypes(state, config.accessRoleTypes))
    const creationRoles = useSelector(state =>
      selectCurrentRolesByTypes(state, config.creationRoleTypes))
    const modificationRoles = useSelector(state =>
      selectCurrentRolesByTypes(state, config.modificationRoleTypes))

    useEffect(() => {
      if (canRenderChildren) {
        return
      }

      if (isCreatedEntity) {
        if (creationRoles.length) {
          setCanRenderChildren(true)
          return
        }
        history.push(getReadOnlyUrl())
      }

      if (isModifiedEntity) {
        if (modificationRoles.length) {
          setCanRenderChildren(true)
          return
        }
        history.push(getReadOnlyUrl())
      }

      if (!isCreatedEntity && !isModifiedEntity) {
        if (accessRoles) {
          if (accessRoles.length) {
            setCanRenderChildren(true)
            return
          }
          history.push(getReadOnlyUrl())
        }
        setCanRenderChildren(true)
      }
    }, [
      accessRoles,
      canRenderChildren,
      creationRoles,
      modificationRoles,
      getReadOnlyUrl,
      history,
      isCreatedEntity,
      isModifiedEntity,
      setCanRenderChildren
    ])

    if (!canRenderChildren) {
      return null
    }
    return <WrappedComponent {...props} />
  }
