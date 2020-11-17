import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, useLocation, useParams } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'
import { useFormidable } from 'with-react-formidable'

import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
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
