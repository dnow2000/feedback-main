import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { selectEntitiesByKeyAndJoin, selectEntityByKeyAndId } from 'redux-thunk-data'


import Feeds from 'components/layout/Feeds'
import Icon from 'components/layout/Icon'
import ReviewItem from 'components/layout/ReviewItem'
import UserItem from 'components/layout/UserItem'
import selectReviewersByVerdictId from 'selectors/selectReviewersByVerdictId'

import verdictReviewerItem from './VerdictReviewerItem'


const defaultSelectedUserIds = []  // XXX @colas branch to existing


export default ({ onChange }) => {
  const { search } = useLocation()
  const params = useParams()
  const { verdictId } = params


  const config = useMemo(() => ({
    apiPath: `/users${search}`,
    isMergingDatum: true
  }), [search])


  const [selectedUserIds, setSelectedUserIds] = useState(defaultSelectedUserIds)


  const verdictReviewers = useSelector(state =>
    selectReviewersByVerdictId(state, verdictId))
  const verdict = useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))
  const { articleId } = verdict || {}

  const reviews = useSelector(state =>
    selectEntitiesByKeyAndJoin(
      state,
      'reviews',
      { key: 'articleId', value: articleId }
  ))


  const handleClickUser = useCallback(userId => {
    setSelectedUserIds(selectedUserIds => {
      let nextSelectedUserIds
      if (selectedUserIds.includes(userId)) {
        nextSelectedUserIds = selectedUserIds.filter(idx => idx !== userId)
      } else {
        nextSelectedUserIds = [...selectedUserIds, userId]
      }
      return nextSelectedUserIds
    })
    }, [setSelectedUserIds]
  )

  const renderItem = useCallback(item => (
    <UserItem
      onClick={handleClickUser}
      user={item}
    />
  ), [handleClickUser])


  useEffect(() => {
    if (onChange) {
      onChange(selectedUserIds)
    }
  }, [onChange, selectedUserIds])


  return (
    <div className="reviewers-manager">
      <h2 className="subtitle">
        {"Reviews"}
      </h2>
      {
        (reviews && reviews.length > 0)
          ? reviews.map(review => (
              <ReviewItem
                key={review.id}
                review={review}
              />
            ))
          : (
            <div className="empty-review">
              <div>
                <Icon name="ico-plume.svg" />
                <div>
                  {'No reviews yet !'}
                </div>
              </div>
            </div>)

      }
      {
        (verdictReviewers && verdictReviewers.length > 0) && (
          <>
            <h2 className="subtitle">
              {"Selected Reviewers"}
            </h2>
            {verdictReviewers.map(verdictReviewer => (
              <verdictReviewerItem
                key={verdictReviewer.id}
                user={verdictReviewer}
              />))}
          </>)
      }
      <h2 className="subtitle">
        {"Recruit Reviewers"}
      </h2>
      <Feeds
        cols={2}
        config={config}
        renderItem={renderItem}
      />
    </div>
  )
}
