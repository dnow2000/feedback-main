import createDecorator from 'final-form-calculate'

import getScrap from '../utils/getScrap'

const scrapDecorator = createDecorator(
  {
    field: 'url',
    updates: async (url, urlKey, formValues)  => {
      const scrap = await getScrap(url)
      if (!scrap) {
        return {}
      }
      return Object.assign({}, scrap.values, formValues)
    }
  }
)

export default scrapDecorator
