import createDecorator from 'final-form-calculate'
import { createSelector } from 'reselect'

import { API_URL } from './config'
import { isEmpty } from './form'


export const getScrap = createSelector(
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


export const scrapDecorator = createDecorator(
  {
    field: 'url',
    updates: async (url, urlKey, formValues)  => {
      const scrap = await getScrap(url)
      if (!scrap) return {}
      return { ...scrap.values, ...formValues }
    }
  }
)
