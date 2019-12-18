import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(name) {
  return name
}

export const selectEntitiesOptionsFromNameAndEntities = createCachedSelector(
  (name, entities) => entities,
  (name, entities, placeholder, labelKey) => labelKey || 'label',
  (name, entities, placeholder, labelKey, valueKey) => valueKey || 'id',
  (name, entities, placeholder, labelKey, valueKey, titleKey) => titleKey || 'title',
  (name, entities, placeholder, labelKey, valueKey, titleKey, idKey) => idKey || 'id',
  (entities, labelKey, labelValue, titleKey, idKey) => {
    const entitiesOptions = entities.map(o => ({
      id: o && o[idKey],
      label: o && o[labelKey],
      title: o && o[titleKey],
      value: o && o[labelValue],
    }))

    return entitiesOptions
  }
)(mapArgsToCacheKey)

export default selectEntitiesOptionsFromNameAndEntities
