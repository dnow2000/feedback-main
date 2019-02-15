import { stringify } from 'query-string'
import createCachedSelector from 're-reselect'

import { selectSearchFromLocation } from './selectSearchFromLocation'

function mapArgsToCacheKey(location) {
  return location.pathname + location.search
}

export const selectNewOrEditEntityContextFromLocation = createCachedSelector(
  location => location.pathname,
  location => location.search,
  selectSearchFromLocation,
  (pathname, searchString, search) => {
    if (pathname.endsWith('new')) {
      return {
        isEditEntity: false,
        isNewEntity: true,
        method: 'POST',
        originLocationString: `${pathname.slice(0, -3)}${searchString}`,
        readOnly: false,
      }
    }

    if (Object.keys(search).includes('edit')) {
      const nextSearch = Object.assign({}, search)
      delete nextSearch.edit
      const nextSearchString = stringify(nextSearch)
      return {
        isEditEntity: true,
        isNewEntity: false,
        method: 'PATCH',
        originLocationString: `${pathname}${nextSearchString}`,
        readOnly: false,
      }
    }

    return {
      isEditEntity: false,
      isNewEntity: false,
      method: null,
      readOnly: true,
    }
  }
)(mapArgsToCacheKey)

export default selectNewOrEditEntityContextFromLocation
