import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
import { requestData } from 'redux-thunk-data'

export default () => {
  const dispatch = useDispatch()

  const claims = useSelector(state => state.data.claims)

  useEffect(() => {
    dispatch(requestData({
      apiPath: '/claims'
    }))
  }, [dispatch])

  return (
    <div>
      {
        claims && claims.map(claim => {
          return (
            <NavLink
              key={claim.id}
              to={`/claims/${claim.id}`}
            >
              {claim.text}
            </NavLink>
          )
        })
      }
    </div>
  )
}
