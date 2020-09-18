import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useLocation, useParams } from 'react-router-dom'

import { entityMatch } from 'components/router'
import selectSortedAppearancesByVerdictId from 'selectors/selectSortedAppearancesByVerdictId'

import ClaimGraph from './ClaimGraph'
import Links from './Links'
import Shares from './Shares'
import Tabs from './Tabs'


export default () => {
  const location = useLocation()
  const { tab, verdictId } = useParams()

  const appearances = useSelector(state =>
    selectSortedAppearancesByVerdictId(state, verdictId))

  if (!tab) {
    return <Redirect to={`/verdicts/${verdictId}/testimony/appearances`}/>
  }

  if (!appearances.length) {
    return (
      <div className='appearances empty'>
        {'No appearance recorded for this content.'}
      </div>
    )
  }


  return (
    <div className="appearances">
      {/*<Add />*/}
      <Tabs />
      <Switch location={location}>
        <Route
          component={Links}
          exact
          path={`/verdicts/:verdictId(${entityMatch})/testimony/appearances`}
        />
        <Route
          component={Shares}
          exact
          path={`/verdicts/:verdictId(${entityMatch})/testimony/shares`}
        />
        <Route
          component={ClaimGraph}
          exact
          path={`/verdicts/:verdictId(${entityMatch})/testimony/graph`}
        />
      </Switch>
    </div>
  )
}
