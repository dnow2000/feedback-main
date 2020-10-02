import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'

import Header from 'components/layout/Header'
import Loader from 'components/layout/LoadMore'
import Main from 'components/layout/Main'
import ShareItem from 'components/layout/ShareItem'
import ThumbImg from 'components/layout/ThumbImg'
import { verdictNormalizer } from 'utils/normalizers'
import { numberShortener } from 'utils/shorteners'


const _ = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { appearanceId } = params
  const appearance = useSelector(
    state => selectEntityByKeyAndId(state, 'appearances', appearanceId),
    [appearanceId]
  ) || {}
  const { interactions, quotingContent } = appearance || []
  const { archiveUrl, totalShares, title, url } = quotingContent || {}
  // const { hostname } = new URL(url) || {}

  useEffect(() => {
    dispatch(requestData({
      apiPath: `/appearances/${appearanceId}/interactions`,
      isMergingDatum: true,
      normalizer: verdictNormalizer
    }))
  }, [appearanceId, dispatch])

  const showMoreButton = useCallback(props => (
    <div className="show-more">
      <button
        type='button'
        {...props}
      >
        {props.text}
      </button>
    </div>
  ), [])

  const renderItem = useCallback(item => {
    return (
      <ShareItem
        item={item}
        key={item.post.id}
      />
    )}, [])

  return (
    <>
      <Header />
      <Main classnames="appearance">
        <div className="container">
          <div>
            <div
              className="appearance-item"
            >
              <ThumbImg
                className='appearance-item-img'
                collectionName='contents'
                {...quotingContent}
              />
              <div className="appearance-data">
                <h4 className='appearance-title'>
                  {title}
                </h4>
                <p className="text-muted appearance-source">
                  <small>
                    {/*{hostname}*/}
                  </small>
                </p>
                <p className="appearance-url">
                  { archiveUrl && (
                    <a
                      className="appearance-url"
                      href={archiveUrl}
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      {"[ Archive link ]"}
                    </a>
                  )}
                </p>
                <div className="appearance-footer">
                  { totalShares > 0 && (
                    <span>
                      {`${numberShortener(totalShares)} interactions`}
                    </span>
                  ) }
                </div>
              </div>
            </div>
            <section>
              <Loader
                Button={showMoreButton}
                items={interactions}
                loadLessText='Show less'
                loadMoreText='Show more'
                renderItem={renderItem}
              />
            </section>
          </div>
        </div>
      </Main>
    </>
  )
}

export default _
