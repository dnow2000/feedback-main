import getScrap from '../../utils/getScrap'

const createValidateScrapField = error => async value => {
  const scrap = await getScrap(value)
  if (!scrap.error) return undefined
  return error || scrap.error
}

export default createValidateScrapField
