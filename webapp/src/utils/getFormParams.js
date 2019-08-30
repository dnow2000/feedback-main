import { createSelector } from 'reselect'

const getFormParams = createSelector(
  (entityName, { match }) => match.params[`${entityName}Id`],
  (entityName, { location }) => location.pathname,
  (entityName, { location }) => location.search,
  (entityName, { match }) => match.params.modification,
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

export default getFormParams
