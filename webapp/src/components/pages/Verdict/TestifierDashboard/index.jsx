import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useLocation, useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'

import VerdictItem from 'components/layout/VerdictItem'
import { verdictNormalizer } from 'utils/normalizers'
import { entityMatch } from 'utils/router'

import ClaimGraph from './ClaimGraph'
import Links from './Links'
// import Shares from './Shares'
import Tabs from './Tabs'


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
    return <Redirect to={`/verdicts/${verdictId}/testimony/links`} />
  }

  if (!verdict) return null


  return (
    <div className='testifier-dashboard'>
      <VerdictItem
        asLink={false}
        verdict={verdict}
        withLinksShares={false}
      />
      <Tabs />
      <Switch location={location}>
        <Route
          component={Links}
          exact
          path={`/verdicts/:verdictId(${entityMatch})/testimony/links`}
        />
        {/*<Route
          component={Shares}
          exact
          path={`/verdicts/:verdictId(${entityMatch})/testimony/shares`}
        />*/}
        <Route
          component={ClaimGraph}
          exact
          path={`/verdicts/:verdictId(${entityMatch})/testimony/graph`}
        />
      </Switch>
    </div>
  )
}
