import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { showModal } from 'redux-react-modals'

import Feeds from 'components/layout/Feeds/Feeds'
import ReviewItemContainer from 'components/layout/ReviewItem/ReviewItemContainer'

import UserItemContainer from './UserItem/UserItemContainer'
import VerdictUserItemContainer from '../VerdictUserItem/VerdictUserItemContainer'

const ReviewersManager = ({
  dispatch,
  location: { search },
  onChange,
  reviews,
  verdictUsers,
}) => {

  const [selectedUserIds, setSelectedUserIds] = useState([])
  const handleClickUser = useCallback(userId => {
    let nextSelectedUserIds
    if (selectedUserIds.includes(userId)) {
      nextSelectedUserIds = selectedUserIds.filter(idx => idx !== userId)
    } else {
      nextSelectedUserIds = [...selectedUserIds, userId]
    }
    setSelectedUserIds(nextSelectedUserIds)
    }, [selectedUserIds, setSelectedUserIds]
  )
  useEffect(() => {
    if (onChange) {
      onChange(selectedUserIds)
    }
  }, [selectedUserIds])

  // const config = useMemo(() => ({
  //   apiPath: `/users${search}`
  // }), [search])

  // const onAddClick = useCallback(() => {
  //   const renderItem = item => <UserItemContainer user={item} />
  //   dispatch(showModal("main",
  //     <Feeds config={config} renderItem={renderItem} />))
  // }, [config, dispatch])

  // const hasNoReviewers = !verdictUsers || verdictUsers.length === 0

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
