import React, { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import ItemsContainer from 'components/layout/Feeds/Items/ItemsContainer'
import UserItemContainer from 'components/layout//UserItem/UserItemContainer'
import { userConfig } from 'utils/normalizers'


const ApplyingReviewers = () => {

  const { search } = useLocation()
  const config = useMemo(() => ({
    apiPath: "/users?roles=reviewer",
    activityTag: "applying-reviewers",
    ...userConfig
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
