import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useFormidable } from 'with-react-formidable'

import selectCurrentRolesByTypes from 'selectors/selectCurrentRolesByTypes'


export default (config = {
  accessRoleTypes: [],
  creationRoleTypes: [],
  modificationRoleTypes: [],
  readOnlyRoleTypes: []
}) => WrappedComponent =>
  props => {
    const history = useHistory()
    const location = useLocation()
    const params = useParams()
    const {
      getReadOnlyUrl,
      id,
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

    const readOnlyRoles = useSelector(state =>
      selectCurrentRolesByTypes(state, config.readOnlyRoleTypes))


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
        if (readOnlyRoles) {
          if (readOnlyRoles.length) {
            setCanRenderChildren(true)
            return
          }
        }

        if (accessRoles) {
          if (accessRoles.length) {
            setCanRenderChildren(true)
            return
          }
          let redirectUrl = getReadOnlyUrl()
          if (id) {
            redirectUrl = redirectUrl.replace(`/${id}`, '')
          }
          history.push(redirectUrl)
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
      id,
      isCreatedEntity,
      isModifiedEntity,
      readOnlyRoles,
      setCanRenderChildren
    ])


    if (!canRenderChildren) {
      return null
    }
    return <WrappedComponent {...props} />
  }
