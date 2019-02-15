import { isEmpty } from '../strings'
import { API_URL } from '../../../utils/config'

export async function getScrap(url) {

  if (isEmpty(url)) {
    return {}
  }

  try {
    const response = await fetch(`${API_URL}/scrap?url=${url}`)
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

export default getScrap
