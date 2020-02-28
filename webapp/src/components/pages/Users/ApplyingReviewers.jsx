import React, { useCallback, useMemo } from 'react'

import ItemsContainer from 'components/layout/Feeds/Items/ItemsContainer'
import UserItem from 'components/layout//UserItem'
import { userConfig } from 'utils/normalizers'


const ApplyingReviewers = () => {

  const config = useMemo(() => ({
    apiPath: "/users?roles=reviewer",
    activityTag: "applying-reviewers",
    ...userConfig
  }), [])

  const renderItem = useCallback(item => <UserItem user={item} />, [])

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
