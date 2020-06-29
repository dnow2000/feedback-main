import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'

import Graph from 'components/layout/Graph'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'


export default () => {
  const dispatch = useDispatch()
  const { collectionName, entityId } = useParams()

  const graphs = useSelector(state => state.data.graphs) || []

  useEffect(() => {
    let apiPath = '/graphs'
    if (collectionName && entityId) {
      apiPath = `${apiPath}/${collectionName}/${entityId}`
    }
    dispatch(requestData({ apiPath }))
  }, [collectionName, dispatch, entityId])


  return (
    <>
      <Header />
      <Main className="exploration with-header">
        <div className="container">
          <Graph graph={graphs[0]}/>
        </div>
      </Main>
    </>
  )
}
