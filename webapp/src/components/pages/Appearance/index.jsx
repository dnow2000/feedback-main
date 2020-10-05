import React, { useCallback, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'

import AppearanceItem from 'components/layout/AppearanceItem'
import Header from 'components/layout/Header'
import Items from 'components/layout/Items'
import Main from 'components/layout/Main'


const _ = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { appearanceId } = params


  const appearance = useSelector(
    state => selectEntityByKeyAndId(state, 'appearances', appearanceId),
    [appearanceId]
  ) || {}
  const { quotedContentId } = appearance

  useEffect(() => {
    dispatch(requestData({
      apiPath: `/appearances/${appearanceId}`
    }))
  }, [appearanceId, dispatch])

  const renderItem = useCallback(item => {
    // TODO waiting that type is in the database
    item.type = 'share'
    return (
      <AppearanceItem
        item={item}
        key={item.id}
      />
    )}, [])

  return (
    <>
      <Header />
      <Main classnames="appearance">
        <div className="container">
          <AppearanceItem appearance={appearance} />
          <section>
            <Items
              config={useMemo(() => ({
                apiPath: `/appearances?quotedContentId=${quotedContentId}`
              }), [quotedContentId])}
              renderItem={renderItem}
            />
          </section>
        </div>
      </Main>
    </>
  )
}

export default _
