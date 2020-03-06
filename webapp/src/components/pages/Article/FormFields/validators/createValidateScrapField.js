import { getScrap } from 'utils/scrap'

const createValidateScrapField = error => async value => {
  const scrap = await getScrap(value)
  if (!scrap.error) return undefined
  return error || scrap.error
}

export default createValidateScrapField
