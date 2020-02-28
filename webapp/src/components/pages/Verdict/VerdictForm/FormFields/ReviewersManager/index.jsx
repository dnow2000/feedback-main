import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { selectEntitiesByKeyAndJoin, selectEntityByKeyAndId } from 'redux-thunk-data'


import Feeds from 'components/layout/Feeds/Feeds'
import Icon from 'components/layout/Icon'
import ReviewItem from 'components/layout/ReviewItem'
import UserItem from 'components/layout/UserItem'
import selectUsersByVerdictId from 'selectors/selectUsersByVerdictId'

import VerdictUserItem from './VerdictUserItem/VerdictUserItem'


const defaultSelectedUserIds = []  // XXX @colas branch to existing


export default ({ onChange }) => {
  const dispatch = useDispatch()
  const { search } = useLocation()
  const params = useParams()
  const { verdictId } = params


  const config = useMemo(() => ({
    apiPath: `/users${search}`
  }), [search])


  const [selectedUserIds, setSelectedUserIds] = useState(defaultSelectedUserIds)


  const verdictUsers = useSelector(state =>
    selectUsersByVerdictId(state, verdictId))
  const verdict = useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))
  const { articleId } = verdict || {}

  const reviews = useSelector(state =>
    selectEntitiesByKeyAndJoin(
      state,
      'reviews',
      { key: 'articleId', value: articleId }
  ))


  const handleClickUser = useCallback(userId => {
    setSelectedUserIds(selectedUserIds => {
      let nextSelectedUserIds
      if (selectedUserIds.includes(userId)) {
        nextSelectedUserIds = selectedUserIds.filter(idx => idx !== userId)
      } else {
        nextSelectedUserIds = [...selectedUserIds, userId]
      }
      return nextSelectedUserIds
    })
    }, [setSelectedUserIds]
  )

  const renderItem = useCallback(item => (
    <UserItem
      onClick={handleClickUser}
      user={item}
    />
  ), [handleClickUser])


  useEffect(() => {
    if (onChange) {
      onChange(selectedUserIds)
    }
  }, [onChange, selectedUserIds])


  return (
    <div className="reviewers-manager">
      <h2 className="subtitle">
        {"Reviews"}
      </h2>
      {
        (reviews && reviews.length > 0)
          ? reviews.map(review => (
              <ReviewItem
                key={review.id}
                review={review}
              />
            ))
          : (
            <div className="empty-review">
              <div>
                <Icon name="ico-plume.svg" />
                <div>
                  {'No reviews yet !'}
                </div>
              </div>
            </div>)

      }
      {
        (verdictUsers && verdictUsers.length > 0) && (
          <>
            <h2 className="subtitle">
              {"Selected Reviewers"}
            </h2>
            {verdictUsers.map(verdictUser => (
              <VerdictUserItem
                key={verdictUser.id}
                user={verdictUser}
              />))}
          </>)
      }
      <h2 className="subtitle">
        {"Recruit Reviewers"}
      </h2>
      <Feeds
        cols={2}
        config={config}
        renderItem={renderItem}
      />
    </div>
  )
}
