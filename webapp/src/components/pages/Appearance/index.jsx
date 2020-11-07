import React, { useCallback, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { requestData, selectEntityByKeyAndId, selectEntitiesByKeyAndJoin } from 'redux-thunk-data'

import AppearanceItem from 'components/layout/AppearanceItem'
import Header from 'components/layout/Header'
import Items from 'components/layout/Items'
import Main from 'components/layout/Main'
import selectDataAreAnonymized from 'selectors/selectDataAreAnonymized'


const _ = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { appearanceId } = params

  const areDataAnonymized = useSelector(selectDataAreAnonymized)

  const appearance = useSelector(state =>
    selectEntityByKeyAndId(state, 'appearances', appearanceId), [appearanceId]) || {}
  appearance.type = 'link'
  const { quotingContent, quotingContentId } = appearance || {}
  const config = useMemo(() => ({
    apiPath: `/appearances${areDataAnonymized ? '/anonymized' : ''}?type=APPEARRANCE&subType=SHARE&quotedContentId=${quotingContentId}`
  }), [areDataAnonymized, quotingContentId])

  const shareAppearances = useSelector(state =>
    selectEntitiesByKeyAndJoin(state,
                               'appearances',
                               { key: 'quotedContentId', value: quotingContentId }), [quotingContentId])


  const renderItem = useCallback(item => (
    <AppearanceItem
      appearance={item}
      key={item.id}
    />
  ), [])


  useEffect(() => {
    dispatch(requestData({
      apiPath: `/appearances/${appearanceId}${areDataAnonymized ? '/anonymized' : ''}`
    }))
  }, [areDataAnonymized, appearanceId, dispatch])


  return (
    <>
      <Header />
      <Main className="appearance">
        <div className="container">
          <AppearanceItem
            appearance={appearance}
            articleOrVideoContent={quotingContent}
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
