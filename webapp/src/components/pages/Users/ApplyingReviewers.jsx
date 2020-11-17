import React, { useCallback, useMemo } from 'react'

import Items from 'components/layout/Items'
import UserItem from 'components/layout/UserItem'
import { userConfig } from 'utils/normalizers'


export default () => {

  const config = useMemo(() => ({
    ...userConfig,
    apiPath: "/users?applyingReviewers=true",
    tag: "applying-reviewers"
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
