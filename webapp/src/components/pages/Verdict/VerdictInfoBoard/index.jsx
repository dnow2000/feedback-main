import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectEntityByKeyAndId } from 'redux-thunk-data'

import Avatar from 'components/layout/Avatar'
import Extract from 'components/layout/Extract'
import AppearanceItem from 'components/layout/AppearanceItem'


export default () => {
  const params = useParams()
  const { verdictId } = params

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
    </>
  )
}
