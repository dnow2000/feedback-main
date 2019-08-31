import { createSelector } from 'reselect'

const getId = ({ match, location, name }) => {
  const { params } = match
  if (name) {
    return params[`${name}Id`]
  }

  const { pathname } = location
  return pathname.split('/').slice(-1)[0]
}

const getForm = createSelector(
  getId,
  ({ location }) => location.pathname,
  ({ location }) => location.search,
  ({ match }) => match.params.modification,
  (id, pathname, search, modification) => {

    const isCreatedEntity = id === "creation"
    const isModifiedEntity = modification === "modification"

    const readOnly = !isCreatedEntity && !isModifiedEntity
    let creationUrl
    let modificationUrl
    let readOnlyUrl

    let method
    if (isCreatedEntity) {
      method = "POST"
    } else if (isModifiedEntity) {
      method = "PATCH"
      readOnlyUrl = `${pathname.replace("/modification", "")}${search}`
    } else {
      creationUrl = `${pathname}/creation${search}`
      modificationUrl = `${pathname}/modification${search}`
    }

    return {
      creationUrl,
      id,
      isCreatedEntity,
      isModifiedEntity,
      method,
      modificationUrl,
      readOnly,
      readOnlyUrl
    }
  }
)

export default getForm
