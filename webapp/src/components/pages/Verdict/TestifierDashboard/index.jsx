import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useLocation, useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'

import VerdictItem from 'components/layout/VerdictItem'
import FeaturedRoute from 'components/Root/FeaturedRoute'
import { verdictNormalizer } from 'utils/normalizers'
import { entityMatch } from 'utils/router'

import Citations from './Citations'
import Shares from './Shares'
import Tabs from './Tabs'
import VerdictGraph from './VerdictGraph'


export default () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { tab, verdictId } = useParams()


  const verdict =  useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))


  useEffect(() => {
    dispatch(requestData({
      apiPath: `/verdicts/${verdictId}/appearances`,
      normalizer: verdictNormalizer
    }))
  }, [dispatch, verdictId])

  if (!tab) {
    return <Redirect to={`/verdicts/${verdictId}/testimony/citations`} />
  }

  if (!verdict) return null


  return (
    <div className='testifier-dashboard'>
      <VerdictItem
        asLink={false}
        verdict={verdict}
        withCitationsAndShares={false}
      />
      <Tabs />
      <Switch location={location}>
        <Route
          component={Citations}
          exact
          path={`/verdicts/:verdictId(${entityMatch})/testimony/citations`}
        />
        <FeaturedRoute
          component={Shares}
          exact
          featureName='WITH_VERDICT_SHARES'
          path={`/verdicts/:verdictId(${entityMatch})/testimony/shares`}
        />
        <Route
          component={VerdictGraph}
          exact
          path={`/verdicts/:verdictId(${entityMatch})/testimony/graph`}
        />
      </Switch>
    </div>
  )
}
