import createCachedSelector from 're-reselect'

import { selectEntitiesOptionsFromNameAndEntities } from './selectEntitiesOptionsFromNameAndEntities'

function mapArgsToCacheKey(name) {
  return name
}

export const selectOptionsFromNameAndEntitiesAndPlaceholder = createCachedSelector(
  selectEntitiesOptionsFromNameAndEntities,
  (name, entities, placeholder) => placeholder,
  (entitiesOptions, placeholder) => {

    if (entitiesOptions.length === 1) {
      return entitiesOptions
    }

    let entitiesOptionsWithPlaceholder = entitiesOptions
    if (placeholder) {
      entitiesOptionsWithPlaceholder = [{ label: placeholder, value: '' }]
        .concat(entitiesOptionsWithPlaceholder)
    }

    return entitiesOptionsWithPlaceholder
  }
)(mapArgsToCacheKey)

export default selectOptionsFromNameAndEntitiesAndPlaceholder
