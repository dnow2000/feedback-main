export const getBarSizeByValue = ratings => {
  const countsByValue = getRatingsCountByValue(ratings)
  const maxCount = Object.values(countsByValue).reduce((acc, c) => acc > c ? acc : c, 0)
  const lagSize = 6
  const maxSize = 30
  const step = (maxSize - lagSize) / maxCount
  const barSizeByValue = {}
  for (const value of Object.keys(countsByValue)) {
    barSizeByValue[value] = lagSize + countsByValue[value] * step
  }
  return barSizeByValue
}


export const getColorClassName = meanRating => {
  if (meanRating == null) return "na"
  if (meanRating >= 1) return "positive"
  if (meanRating >= 0) return "neutral"
  return "negative"
}

export const getMeanRating = ratings => {
  const ratingsNotNull = ratings.filter(r => r !== null)
  const sum = ratingsNotNull.reduce((acc, rating) => acc + rating, 0)
  const mean = ratingsNotNull.length > 0
    ? sum / ratingsNotNull.length
    : null
  return mean
}


const getRatingsCountByValue = ratings => {
  const ratingsCountByValue = {}
  for (const value of RATING_VALUES) {
    ratingsCountByValue[value] = 0
  }
  for (const rating of ratings) {
    const value = rating !== null
      ? `${rating}`
      : 'na'
    ratingsCountByValue[value] = ratingsCountByValue[value] + 1
  }
  return ratingsCountByValue
}


// XXX @quentin: put back first line and remove second line when done testing
// const ratings = reviews.map(r => r.rating)
export default [-2, -2, -2, 0, 1, 1, 2, 2, 2, 2, null]
export const RATING_VALUES = ['2', '1', '0', '-1', '-2', 'na']


export const round = (x, n=0) => Math.round(x*10**n) / 10**n
