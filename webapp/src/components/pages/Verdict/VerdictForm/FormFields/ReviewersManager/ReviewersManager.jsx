import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import Feeds from 'components/layout/Feeds/Feeds'
import Icon from 'components/layout/Icon'
import ReviewItem from 'components/layout/ReviewItem'
import UserItem from 'components/layout/UserItem'

import VerdictUserItem from './VerdictUserItem/VerdictUserItem'


const defaultSelectedUserIds = []  // XXX @colas branch to existing


export default ({
  location: { search },
  onChange,
  reviews,
  verdictUsers,
}) => {
  const dispatch = useDispatch()

  const [selectedUserIds, setSelectedUserIds] = useState(defaultSelectedUserIds)
  const handleClickUser = useCallback(userId => {
    setSelectedUserIds(selectedUserIds => {
      let nextSelectedUserIds
      if (selectedUserIds.includes(userId)) {
        nextSelectedUserIds = selectedUserIds.filter(idx => idx !== userId)
      } else {
        nextSelectedUserIds = [...selectedUserIds, userId]
      }
      console.log('CHANGE', userId, selectedUserIds.length, nextSelectedUserIds.length, nextSelectedUserIds)
      return nextSelectedUserIds
    })
    }, [setSelectedUserIds]
  )
  useEffect(() => {
    if (onChange) {
      onChange(selectedUserIds)
    }
  }, [onChange, selectedUserIds])

  console.log('REVIEWS', reviews && reviews.length)
  console.log('SELECTED', selectedUserIds.length)

  const config = useMemo(() => ({
    apiPath: `/users${search}`
  }), [search])

  const renderItem = useCallback(item => (
    <UserItem
      onClick={handleClickUser}
      user={item}
    />
  ), [handleClickUser]
  )

  console.log(verdictUsers)

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
