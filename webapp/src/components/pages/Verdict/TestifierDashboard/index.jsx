import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Switch, useLocation, useParams } from 'react-router-dom'
import { selectEntityByKeyAndId } from 'redux-thunk-data'

import VerdictItem from 'components/layout/VerdictItem'
import FeaturedRoute from 'components/Root/FeaturedRoute'
import { entityMatch } from 'utils/router'

import Backlinks from './Backlinks'
import Graph from './Graph'
import Quotations from './Quotations'
import Shares from './Shares'
import Tabs from './Tabs'


const componentsByTabName = {
  quotations: Quotations,
  shares: Shares,
  graph: Graph,
  backlinks: Backlinks,
}


export default () => {
  const location = useLocation()
  const { tab, verdictId } = useParams()


  const verdict =  useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))


  if (!tab) {
    return <Redirect to={`/verdicts/${verdictId}/testimony/quotations`} />
  }

  if (!verdict) return null


  return (
    <div className='testifier-dashboard'>
      <VerdictItem
        asLink={false}
        verdict={verdict}
        withQuotationsAndShares={false}
      />
      <Tabs />
      <Switch location={location}>
        {Object.keys(componentsByTabName).map(tabName => (
          <FeaturedRoute
            component={componentsByTabName[tabName]}
            exact
            featureName={`WITH_VERDICT_${tabName.toUpperCase()}`}
            key={tabName}
            path={`/verdicts/:verdictId(${entityMatch})/testimony/${tabName}`}
          />
        ))}
      </Switch>
    </div>
  )
}
