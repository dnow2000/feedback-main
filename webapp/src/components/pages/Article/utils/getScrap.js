import { createSelector } from 'reselect'

import { API_URL } from 'utils/config'
import isEmpty from 'utils/form/isEmpty'

const getScrap = createSelector(
  url => url,
  async url => {

    if (!url || isEmpty(url)) {
      return {}
    }

    try {
      const scrapUrl = `${API_URL}/scrap?url=${encodeURIComponent(url)}`
      const response = await fetch(scrapUrl)
      if (response.status === 400) {
        const body = await response.json()
        return {
          error: body.url[0],
          values: null
        }
      }

      const body = await response.json()
      return { values: body }

    } catch (error) {

      return {
        error: 'Unable to check the url',
        values: null
      }
    }
  }
)

export default getScrap
