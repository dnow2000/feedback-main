import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'


import selectIsFeatureDisabledByName from 'selectors/selectIsFeatureDisabledByName'


const _ = ({
   featureName,
   renderWhenDisabled,
   ...routeProps
}) => {
  const dispatch = useDispatch()

  const areFeaturesLoaded = useSelector(state =>
    state.data.features ? true : false)

  const isRouteDisabled = useSelector(state => {
    if (!featureName) return false
    return selectIsFeatureDisabledByName(state, featureName)
  }, [featureName])
  const { path } = routeProps


  useEffect(() => {
    if (areFeaturesLoaded) {
      return
    }
    dispatch(requestData({ apiPath: '/features' }))
  }, [areFeaturesLoaded, dispatch])


  if (!areFeaturesLoaded) {
    return null
  }

  if (isRouteDisabled) {
    return (
      <Route
        path={path}
        render={renderWhenDisabled}
      />
    )
  }

  return <Route {...routeProps} />
}


_.defaultProps = {
  featureName: null
}

_.propTypes = {
  featureName: PropTypes.string,
  renderWhenDisabled: PropTypes.func.isRequired,
}

export default _
