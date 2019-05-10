import createDecorator from 'final-form-calculate'

import { getScrap } from '../utils/getScrap'

export const scrapDecorator = createDecorator(
  {
    field: 'url',
    updates: async url  => {
      const scrap = await getScrap(url)
      if (!scrap) {
        return {}
      }
      return scrap.values
    }
  }
)

export default scrapDecorator
