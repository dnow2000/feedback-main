import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import Feeds from 'components/layout/Feeds/Feeds'
import Icon from 'components/layout/Icon'
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
    <UserItemContainer
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
              <ReviewItemContainer
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
              <VerdictUserItemContainer
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

ReviewersManager.defaultProps = {
  verdictUsers: null
}

ReviewersManager.propTypes = {
  dispatch: PropTypes.func.isRequired,
  verdictUsers: PropTypes.array
}

export default ReviewersManager
