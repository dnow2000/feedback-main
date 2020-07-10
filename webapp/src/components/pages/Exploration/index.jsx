import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'

import Graph from 'components/layout/Graph'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import {
  componentAccessor,
  heightAccessor,
  widthAccessor
} from 'utils/exploration'

export default () => {
  const dispatch = useDispatch()
  const { collectionName, entityId } = useParams()
  const enterRef = useRef()

  const [enterElement, setEnterElement] = useState()

  const graphs = useSelector(state => state.data.graphs) || []


  const handleNodeEnter = useCallback((node, { undirectedGraph, renderer }) => {
    if (!node) return
    console.log({node, undirectedGraph, renderer})
    const canvas = enterRef.current.parentElement.querySelector('.sigma-nodes')
    const { clientHeight, clientWidth, height, width } = canvas
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width    // relationship bitmap vs. element for X
    const scaleY = canvas.height / rect.height

    console.log({scaleX, clientWidth, width}, rect.width, node.x)

    enterRef.current.style.top = `${(clientHeight / 2.) - node.y}px`
    enterRef.current.style.left = `${(clientWidth / 2.) + node.x}px`

    //enterRef.current.style.top = `${(clientHeight / 2.) - node.y}px`
    //enterRef.current.style.left = `${(clientWidth / 2.) + node.x}px`
    //enterRef.current.style.top = `${node.y}px`
    //enterRef.current.style.left = `${node.x}px`

    setEnterElement(componentAccessor(node))
  }, [enterRef, setEnterElement])


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
          <Graph
            graph={graphs[0]}
            onNodeEnter={handleNodeEnter}
          />
        </div>
      </Main>
    </>
  )
}
