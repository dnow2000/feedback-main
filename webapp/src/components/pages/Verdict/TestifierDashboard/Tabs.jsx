import classnames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { selectEntityByKeyAndId } from 'redux-thunk-data'

import selectIsFeatureDisabledByName from 'selectors/selectIsFeatureDisabledByName'
import { numberShortener } from 'utils/shorteners'


const tabs = [
  {
    childrenFrom: ({ linksCount }) => `${linksCount} Links`,
    isDisplayedFrom: ({ linksCount }) => linksCount > 0,
    path: 'quotations'
  },
  {
     childrenFrom: ({ sharesCount }) => `${numberShortener(sharesCount)} Interactions`,
     isDisplayedFrom: ({ sharesCount }) => sharesCount > 0,
     path: 'shares'
  },
  {
    childrenFrom: () => 'Graph',
    isDisplayedFrom: () => false,
    path: 'graph'
  },
  {
    childrenFrom: () => 'Backlinks',
    isDisplayedFrom: () => true,
    path: 'backlinks'
  }
]


export default () => {
  const { tab, verdictId } = useParams()
  const { claimId } = useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId)) || {}

  const { linksCount, sharesCount } = useSelector(state =>
    selectEntityByKeyAndId(state, 'claims', claimId)) || {}

  return (
    <div className='tabs'>
      {tabs.map(({ childrenFrom, isDisplayedFrom, path }) =>
        !useSelector(state => selectIsFeatureDisabledByName(state, `WITH_VERDICT_${path.toUpperCase()}`)) &&
        isDisplayedFrom({ linksCount, sharesCount }) && (
        <NavLink
          className={classnames('tab', `tab-${path}`, {
            active: path === tab
          })}
          key={path}
          replace
          to={`/verdicts/${verdictId}/testimony/${path}`}
        >
          {childrenFrom({ linksCount, sharesCount })}
        </NavLink>
      ))}
    </div>
  )
}
