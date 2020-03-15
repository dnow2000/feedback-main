import React, { useCallback, useMemo } from 'react'

import Items from 'components/layout/Feeds/Items'
import UserItem from 'components/layout//UserItem'
import { userConfig } from 'utils/normalizers'


export default () => {

  const config = useMemo(() => ({
    ...userConfig,
    apiPath: "/users?roles=reviewer",
    activityTag: "applying-reviewers"
  }), [])

  const renderItem = useCallback(item => <UserItem user={item} />, [])

  return (
    <Items
      cols={3}
      config={config}
      renderItem={renderItem}
    />
  )
}
