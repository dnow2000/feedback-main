import classnames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'

import selectIsFeatureDisabledByName from 'selectors/selectIsFeatureDisabledByName'
import selectSharesCountByVerdictId from 'selectors/selectSharesCountByVerdictId'
import selectSortedAppearancesByVerdictId from 'selectors/selectSortedAppearancesByVerdictId'
import { numberShortener } from 'utils/shorteners'


const tabs = [
  {
    childrenFrom: ({ linksCount }) => `${linksCount} Citations`,
    isDisplayedFrom: ({ linksCount }) => linksCount > 0,
    path: 'citations'
  },
  {
     childrenFrom: ({ sharesCount }) => `${numberShortener(sharesCount)} Interactions`,
     isDisplayedFrom: ({ sharesCount }) => sharesCount > 0,
     path: 'shares'
  },
  // {
  //   childrenFrom: () => 'Graph',
  //   isDisplayedFrom: () => true,
  //   path: 'graph'
  // },
  // {
  //   childrenFrom: () => 'Backlinks',
  //   isDisplayedFrom: () => true,
  //   path: 'backlinks'
  // }
]


export default () => {
  const { tab, verdictId } = useParams()

  const linksCount = (useSelector(state =>
    selectSortedAppearancesByVerdictId(state, verdictId)) || []).length
  const sharesCount = useSelector(state =>
    selectSharesCountByVerdictId(state, verdictId))


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
