export const getRedirectToSignin = ({ pathname, search }) => {
  const fromUrl = encodeURIComponent(`${pathname}${search}`)
  return `/connexion?de=${fromUrl}`
}

export const getRedirectToCurrentLocationOrArticles = ({
  currentUser,
  pathname,
  search,
}) => {
  const { needsToFillCulturalSurvey } = currentUser || {}
  const currentLocation = `${pathname}${search}`
  return needsToFillCulturalSurvey ? currentLocation : '/articles'
}
