import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo } from 'react'

import ItemsContainer from 'components/layout/Feeds/Items/ItemsContainer'
import userType from 'components/types/userType'

import UserItemContainer from 'components/layout//UserItem/UserItemContainer'

const ApplyingReviewers = ({
  applyingReviewers,
  location: { search },
  requestGetApplyingReviewers
}) => {

  const config = useMemo(() => ({
    apiPath: "/users"
  }), [search])

  const renderItem = useCallback(item => <UserItemContainer user={item} />, [])

  //useEffect(() => { requestGetApplyingReviewers() }, [requestGetApplyingReviewers])


  return (
    <ItemsContainer
      cols={3}
      config={config}
      hasMore={false}
      isLoading={false}
      items={applyingReviewers}
      renderItem={renderItem}
    />
  )
}

ApplyingReviewers.propTypes = {
  applyingReviewers: PropTypes.arrayOf(userType),
  requestGetApplyingReviewers: PropTypes.func.isRequired
}

export default ApplyingReviewers
