import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import Feeds from 'components/layout/Feeds/Feeds'
import ItemsContainer from 'components/layout/Feeds/Items/ItemsContainer'
import ReviewItemContainer from 'components/layout/ReviewItem/ReviewItemContainer'

import UserItemContainer from './UserItem/UserItemContainer'
import VerdictUserItemContainer from './VerdictUserItem/VerdictUserItemContainer'

const defaultSelectedUserIds = []  // XXX @colas branch to existing

const ReviewersManager = ({
  dispatch,
  location: { search },
  onChange,
  reviews,
  verdictUsers,
}) => {

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
    }, [selectedUserIds, setSelectedUserIds]
  )
  useEffect(() => {
    if (onChange) {
      onChange(selectedUserIds)
    }
  }, [selectedUserIds])

  console.log('REVIEWS', reviews && reviews.length)
  console.log('SELECTED', selectedUserIds.length)

  const config = useMemo(() => ({
    apiPath: `/users${search}`
  }), [search])

  const renderItem = useCallback(item => (
    <UserItemContainer
      onClick={handleClickUser}
      user={item}
    />
    ), []
  )

  return (
    <div>
      <h2 className="subtitle flex-columns items-center">
        {"REVIEWS"}
      </h2>
      {
        reviews && reviews.map(review => (
          <ReviewItemContainer
            key={review.id}
            review={review}
          />
        ))
      }
      <h2 className="subtitle flex-columns items-center">
        {"SELECTED REVIEWERS"}
      </h2>
      {
        verdictUsers && verdictUsers.map(verdictUser => (
          <VerdictUserItemContainer
            key={verdictUser.id}
            user={verdictUser}
          />
        ))
      }
      <h2 className="subtitle flex-columns items-center">
        {"RECRUIT REVIEWERS"}
      </h2>
      <Feeds
        cols={2}
        config={config}
        renderItem={renderItem}
      />
    </div>
  )
}

ReviewersManager.defaultProps = {
  verdictUsers: null
}

ReviewersManager.propTypes = {
  dispatch: PropTypes.func.isRequired,
  verdictUsers: PropTypes.array
}

export default ReviewersManager
