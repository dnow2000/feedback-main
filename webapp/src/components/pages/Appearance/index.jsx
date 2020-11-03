import React, { useCallback, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { requestData, selectEntityByKeyAndId, selectEntitiesByKeyAndJoin } from 'redux-thunk-data'

import LinkItem from 'components/layout/LinkItem'
import Header from 'components/layout/Header'
import Items from 'components/layout/Items'
import Main from 'components/layout/Main'
import selectDataAreAnonymized from 'selectors/selectDataAreAnonymized'


const _ = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { linkId } = params

  const areDataAnonymized = useSelector(selectDataAreAnonymized)

  const link = useSelector(state =>
    selectEntityByKeyAndId(state, 'links', linkId), [linkId]) || {}
  link.type = 'link'
  const { linkingContent, linkingContentId } = link || {}
  const config = useMemo(() => ({
    apiPath: `/links${areDataAnonymized ? '/anonymized' : ''}?type=APPEARRANCE&subType=SHARE&linkedContentId=${linkingContentId}`
  }), [areDataAnonymized, linkingContentId])

  const shareAppearances = useSelector(state =>
    selectEntitiesByKeyAndJoin(state,
                               'links',
                               { key: 'linkedContentId', value: linkingContentId }), [linkingContentId])


  const renderItem = useCallback(item => (
    <LinkItem
      link={item}
      key={item.id}
    />
  ), [])


  useEffect(() => {
    dispatch(requestData({
      apiPath: `/links/${linkId}${areDataAnonymized ? '/anonymized' : ''}`
    }))
  }, [areDataAnonymized, dispatch, linkId])


  return (
    <>
      <Header />
      <Main className="link">
        <div className="container">
          <LinkItem
            link={link}
            articleOrVideoContent={linkingContent}
          />
          <section>
            <Items
              config={config}
              itemsCollection={shareAppearances}
              renderItem={renderItem}
            />
          </section>
        </div>
      </Main>
    </>
  )
}

export default _
