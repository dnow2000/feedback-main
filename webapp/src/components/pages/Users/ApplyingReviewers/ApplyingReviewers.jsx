import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import userType from 'components/types/userType'

import UserItemContainer from 'components/layout//UserItem/UserItemContainer'

const ApplyingReviewers = ({
  applyingReviewers,
  requestGetApplyingReviewers
}) => {
  useEffect(() => { requestGetApplyingReviewers() }, [requestGetApplyingReviewers])
  return (
    <div className="items">
      {(applyingReviewers || []).map(applyingReviewer => (
          <div
            className="item-container"
            key={applyingReviewer.id}
          >
            <UserItemContainer
              user={applyingReviewer}
            />
          </div>
      ))}
    </div>
  )
}

ApplyingReviewers.propTypes = {
  applyingReviewers: PropTypes.arrayOf(userType),
  requestGetApplyingReviewers: PropTypes.func.isRequired
}

export default ApplyingReviewers
