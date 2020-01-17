import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import ItemsContainer from 'components/layout/Feeds/Items/ItemsContainer'
import userType from 'components/types/userType'

import UserItemContainer from 'components/layout//UserItem/UserItemContainer'

const ApplyingReviewers = () => {

  const { search } = useLocation()
  const config = useMemo(() => ({
    apiPath: "/users",
    activityTag: "applying-reviewers"
  }), [search])

  const renderItem = useCallback(item => <UserItemContainer user={item} />, [])

  return (
    <ItemsContainer
      cols={3}
      config={config}
      hasMore={false}
      isLoading={false}
      renderItem={renderItem}
    />
  )
}

export default ApplyingReviewers
