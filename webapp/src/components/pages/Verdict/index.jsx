import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useLocation, useParams } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'
import { useFormidable } from 'with-react-formidable'

import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import selectHasCurrentRoleByType from 'selectors/selectHasCurrentRoleByType'
import { verdictNormalizer } from 'utils/normalizers'
import { entityMatch, formMatch } from 'utils/router'

import EditorDashboard from './EditorDashboard'
import TestifierDashboard from './TestifierDashboard'


export default () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const params = useParams()
  const { isCreatedEntity } = useFormidable(location, params)
  const { verdictId } = params

  const isAnonymized = useSelector(state =>
    selectHasCurrentRoleByType(state, 'INSPECTOR'))

  useEffect(() => {
    dispatch(requestData({ apiPath: '/tags?type=EVALUATION' }))
  }, [dispatch])

  useEffect(() => {
    if (isCreatedEntity) return
    dispatch(requestData({
      apiPath: `/verdicts/${verdictId}${isAnonymized ? '/anonymized' : ''}`,
      isMergingDatum: true,
      normalizer: verdictNormalizer,
    }))
  }, [dispatch, isAnonymized, isCreatedEntity, verdictId])


  return (
    <>
      <Header withLinks />
      <Main className="verdict">
        <div className="container">
          <Switch location={location}>
            <Route
              component={EditorDashboard}
              exact
              path={`/verdicts/:verdictId${formMatch}/edition`}
            />
            <Route
              component={TestifierDashboard}
              exact
              path={`/verdicts/:verdictId(${entityMatch})/testimony/:tab(citations|shares|graph|backlinks)?`}
            />
            <Route
              component={TestifierDashboard}
              exact
              path={`/verdicts/:verdictId(${entityMatch})/testimony/appearances/:appearanceId${formMatch}`}
            />
          </Switch>
        </div>
      </Main>
    </>
  )
}
