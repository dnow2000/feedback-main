import classnames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'

import selectSharesCountByVerdictId from 'selectors/selectSharesCountByVerdictId'
import selectSortedAppearancesByVerdictId from 'selectors/selectSortedAppearancesByVerdictId'


// import { numberShortener } from 'utils/shorteners'


const tabs = [
  {
    childrenFrom: ({ linksCount }) => `${linksCount} Links`,
    isDisplayedFrom: ({ linksCount }) => linksCount > 0,
    path: 'appearances'
  },
  // {
  //   childrenFrom: ({ sharesCount }) => `${numberShortener(sharesCount)} Interactions`,
  //   isDisplayedFrom: ({ sharesCount }) => sharesCount > 0,
  //   path: 'shares'
  // },
  // {
  //   childrenFrom: () => 'Graph',
  //   isDisplayedFrom: () => true,
  //   path: 'graph'
  // }
]


export default () => {
  const { tab, verdictId } = useParams()

  const linksCount = (useSelector(state =>
    selectSortedAppearancesByVerdictId(state, verdictId)) || []).length
  const sharesCount = useSelector(state =>
    selectSharesCountByVerdictId(state, verdictId))


  return (
    <div
      className='tabs'
      id='verdict-tab-pane'
    >
      {tabs.map(({ childrenFrom, isDisplayedFrom, path }) => isDisplayedFrom({ linksCount, sharesCount }) && (
        <NavLink
          className={classnames('tab', {
            active: path === tab
          })}
          key={path}
          to={`/verdicts/${verdictId}/testimony/${path}`}
        >
          {childrenFrom({ linksCount, sharesCount })}
        </NavLink>
      ))}
    </div>
  )
}
