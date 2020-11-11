import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, useLocation, useParams } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'
import { useFormidable } from 'with-react-formidable'

import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import { verdictNormalizer } from 'utils/normalizers'
import { idMatch, idFormMatch } from 'utils/router'

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
              path={`/verdicts/:verdictId(${idFormMatch})/edition`}
            />
            <Route
              component={TestifierDashboard}
              exact
              path={`/verdicts/:verdictId(${idMatch})/testimony/:tab(quotations|shares|graph|backlinks)?`}
            />
            <Route
              component={TestifierDashboard}
              exact
              path={`/verdicts/:verdictId(${idMatch})/testimony/links/:linkId${idFormMatch}`}
            />
          </Switch>
        </div>
      </Main>
    </>
  )
}
