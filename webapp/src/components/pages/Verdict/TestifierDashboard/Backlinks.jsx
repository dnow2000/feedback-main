import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'

import BacklinkItem from 'components/layout/BacklinkItem'
import selectSortedLinksByVerdictId from 'selectors/selectSortedLinksByVerdictId'


export default () => {
  const dispatch = useDispatch()
  const { verdictId } = useParams()
  const links = useSelector(state =>
    selectSortedLinksByVerdictId(state, verdictId))
  const [currentPage, setPage] = useState(1)

  const linksSortedByShareCount = useMemo(() =>
    links?.sort((a, b) =>
      b.linkingContent.totalShares - a.linkingContent.totalShares)
    , [links])

  const topLink = linksSortedByShareCount[0]
  const url = topLink?.linkingContent?.url

  useEffect(() => {
    dispatch(requestData({
      apiPath: `/backlinks?url=${url}&count=10&page=${currentPage}`
    }))
  }, [dispatch, currentPage, url])

  const loadMoreAction = useCallback(() => setPage(currentPage + 1), [currentPage])

  const backlinks = useSelector(({ data }) => data.backlinks) || []


  if (!backlinks.length) {
    return (
      <div className='testifier-dashboard empty'>
        {'No backlinks found for this content.'}
      </div>
    )
  }

  return (
    <>
      {backlinks?.map(link => (
        <BacklinkItem
          id={link.id}
          key={link.id}
          link={link}
        />
      ))}
      <div className="show-more">
        <button
          onClick={loadMoreAction}
          type='button'
        >
          {'Load Next 10 Items'}
        </button>
      </div>
    </>
  )
}
