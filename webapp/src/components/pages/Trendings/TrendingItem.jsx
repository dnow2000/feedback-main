import classnames from 'classnames'
import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'
import { selectCurrentUser } from 'with-react-redux-login'

import ArticleItem from 'components/layout/ArticleItem'
import ClaimItem from 'components/layout/ClaimItem'
import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'


const ItemsByName = {
  ArticleItem,
  ClaimItem
}


export default ({ trending }) => {
  const {
    source: {
      id: sourceId
    },
    type
  } = trending
  const dispatch = useDispatch()
  const Item = ItemsByName[`${type[0].toUpperCase()}${type.slice(1)}Item`]


  const itemProps = useMemo(() => ({ [type]: trending }), [trending, type])


  const [isReviewable, setIsReviewable] = useState(undefined)


  const { id: currentUserId } = useSelector(selectCurrentUser) || {}

  const editorRole = useSelector(state =>
    selectRoleByUserIdAndType(state, currentUserId, 'editor'))
  const canVerdict = typeof editorRole !== 'undefined'


  const handleSaveTrending = useCallback(trendingExtraData => () => {
    const body = {
      ...trending,
      ...trendingExtraData
    }

    delete body.id

    setIsReviewable(trendingExtraData && trendingExtraData.isReviewable)

    dispatch(requestData({
      apiPath: '/articles',
      body,
      method: 'POST',
    }))
  }, [dispatch, trending, setIsReviewable])




  return (
    <Item {...itemProps}>
      <button
        className={classnames("button is-secondary thin", {
          'is-loading': isReviewable === false
        })}
        onClick={handleSaveTrending({ isReviewable: false })}
        type="button"
      >
        Remove
      </button>
      {canVerdict && (<NavLink
        className="button is-primary thin"
        to={`/verdicts/creation?type=${type}&sourceId=${sourceId}`}
      >
        Select for verdict
      </NavLink>)}
    </Item>
  )
}
