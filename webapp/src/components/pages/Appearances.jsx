import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { selectEntityByKeyAndId } from 'redux-thunk-data'
import { requestData } from 'redux-thunk-data'
import { useFormidable } from 'with-react-formidable'

import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import Avatar from 'components/layout/Avatar'
import Extract from 'components/layout/Extract'
import AppearanceItem from 'components/layout/AppearanceItem'
import { verdictNormalizer } from 'utils/normalizers'


export default () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const params = useParams()
  const { isCreatedEntity } = useFormidable(location, params)
  const { verdictId } = params


  useEffect(() => {
    if (isCreatedEntity) return
    dispatch(requestData({
      apiPath: `/verdicts/${verdictId}`,
      isMergingDatum: true,
      normalizer: verdictNormalizer,
    }))
  }, [dispatch, isCreatedEntity, verdictId])

  const verdict = useSelector(
    state => selectEntityByKeyAndId(state, 'verdicts', verdictId)
  )
  const { claimId, editor } = verdict || {}
  const { firstName, lastName } = editor || {}

  const claim = useSelector(
    state => selectEntityByKeyAndId(state, 'claims', claimId)
  )
  const { text } = claim || {}

  const verdictTag = useSelector(
    state => selectEntityByKeyAndId(state, 'verdictTags', verdictId)
  )
  const { tagId } = verdictTag || {}

  const tag = useSelector(
    state => selectEntityByKeyAndId(state, 'tags', tagId)
  )
  const { label } = tag || {}

  const appearances = useSelector(
    ({ data }) => data.appearances,
  )

  const linkCount = appearances?.length
  const shareCount = appearances
                      ?.map(appearance => appearance.quotingContent.totalShares)
                      ?.reduce((a, b) => a + b, 0)

  const handleTabClick = useCallback(event => {
    const tabPane = document.getElementById('verdict-tab-pane')
    Array.prototype.map.call(tabPane.children, tab => tab.classList.remove('active'))
    event.target.classList.add('active')
    // TODO: hide and show different tabs
  }, [])

  const showMore = useCallback(event => {
    console.log(`show more ${event}`)
  })


  return (
    <>
      <Header />
      <Main className='appearances'>
        <div className="container">
          <h2>
            {text}
          </h2>
          <div className='info-board-editor-container'>
            <Avatar
              className="avatar editor-avatar"
              user={editor}
            />
            <strong>
              {`${firstName} ${lastName}`}
            </strong>
            <span>
              &nbsp;
              {'checked it'}
              &nbsp;
            </span>
            <strong>
              {`${3} days ago`}
            </strong>
          </div>
          <Extract text={`"${text}"`} />
          <div className='info-board-button-group mb-1'>
            <span className={`tag text-center ${label?.toLowerCase()}`}>
              {label}
            </span>
            <button
              className="button is-primary is-outlined thin"
              type="button"
            >
              {'Read full review'}
              {/*TODO: Navigate to full review upon clicking */}
            </button>
          </div>
          <hr className="w-20 mb-1" />
          { appearances &&  (
            <div
              className='tab-pane'
              id='verdict-tab-pane'
            >
              <button
                className='tab active'
                id='links'
                onClick={handleTabClick}
                type='button'
              >
                {`${linkCount} Links`}
              </button>
              <button
                className='tab'
                id='shares'
                onClick={handleTabClick}
                type='button'
              >
                {`${shareCount || '42'} Shares`}
              </button>
            </div>
          ) }

          { appearances && appearances.map(appearance => (
            <AppearanceItem
              appearance={appearance}
              key={appearance.id}
            />
          )) }

          <div className="show-more">
            <button
              className="button is-primary is-outlined thin"
              onClick={showMore}
              type='button'
            >
              {'Show more'}
            </button>
          </div>

          <div className="appearance-graph-container">
            <h4>
              {'Virality'}
            </h4>
            <div className="appearance-virality-graph-group">
              <img
                alt="virality-graph"
                className="w-100"
                src="http://localhost:3000/static/assets/claim_page_graph_1.png"
              />
            </div>
          </div>

          <div className="appearance-graph-container">
            <h4>
              {'Propagation'}
            </h4>
            <div className="appearance-propagation-graph-group">
              <img
                alt="propagation-graph"
                className="w-100"
                src="http://localhost:3000/static/assets/claim_page_graph_2.png"
              />
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}
