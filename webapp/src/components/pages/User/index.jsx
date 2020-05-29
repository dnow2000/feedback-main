import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'

import PublicationsManagerContainer from './PublicationsManager/PublicationsManagerContainer'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import UserItem from 'components/layout/UserItem'
import { userNormalizer } from 'utils/normalizers'


export default  () => {
  const dispatch = useDispatch()
  const { userId } = useParams()


  const user = useSelector(state =>
    selectEntityByKeyAndId(state, 'users', userId))


  useEffect(() => {
    const { match: { params: { userId } } } = this.props
    dispatch(
      requestData({
        apiPath: `/users/${userId}`,
        normalizer: userNormalizer
      })
    )
  }, [dispatch, userId])


  return (
    <>
      <Header />
      <Main className="review">
        <section className="section hero">
          <h1 className="title">
            Profile
          </h1>
        </section>
        <section>
          <UserItem user={user} />
        </section>
        <section>
          <h3 className="subtitle">
            REVIEWER
          </h3>
          <PublicationsManagerContainer user={user} />
        </section>
      </Main>
    </>
  )
}
