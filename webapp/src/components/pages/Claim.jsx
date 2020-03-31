import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'

export default () => {
  const dispatch = useDispatch()
  const {claimId} = useParams()

  const {text} = useSelector(state => selectEntityByKeyAndId(state, 'claims', claimId)) || {}

  useEffect(() => {
    dispatch(requestData({
      apiPath: `/claims/${claimId}`
    }))
  }, [claimId, dispatch])

  return (
    <div>
      {text}
    </div>
  )
}
