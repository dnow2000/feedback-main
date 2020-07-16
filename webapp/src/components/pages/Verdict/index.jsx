import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'
import { useFormidable } from 'with-react-formidable'
import { selectCurrentUser } from 'with-react-redux-login'

import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import { verdictNormalizer } from 'utils/normalizers'
import Dashboard from 'components/pages/Verdict/EditorDashboard'
import InfoBoard from 'components/pages/Verdict/VerdictInfoBoard'


export default () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const params = useParams()
  const { isCreatedEntity } = useFormidable(location, params)
  const { verdictId } = params
  const currentUser = useSelector(selectCurrentUser)


  useEffect(() => {
    dispatch(requestData({ apiPath: '/tags?type=EVALUATION' }))
  }, [dispatch])

  useEffect(() => {
    if (isCreatedEntity) return
    dispatch(requestData({
      apiPath: `/verdicts/${verdictId}`,
      isMergingDatum: true,
      normalizer: verdictNormalizer,
    }))
  }, [dispatch, isCreatedEntity, verdictId])


  return (
    <>
      <Header />
      <Main className="verdict">
        <div className="container">
          {
            currentUser ?
              <Dashboard /> :
              <InfoBoard />
          }
        </div>
      </Main>
    </>
  )
}
