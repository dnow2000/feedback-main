import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { selectEntitiesByKeyAndJoin } from 'redux-thunk-data'
import { selectCurrentUser } from 'with-react-redux-login'

import ClaimItem from 'components/layout/ClaimItem'
import ContentItem from 'components/layout/ContentItem'
import useLocationURL from 'components/uses/useLocationURL'
import selectCurrentUserReviewByContentId from 'selectors/selectCurrentUserReviewByContentId'
import selectCurrentUserAppearanceByClaimId from 'selectors/selectCurrentUserAppearanceByClaimId'
import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'


const ItemsByName = {
  ClaimItem,
  ContentItem
}


export default ({ source }) => {
  const history = useHistory()
  const locationURL = useLocationURL()
  const type = locationURL.searchParams.get('type')
  const { id } = source
  const Item = ItemsByName[`${type[0].toUpperCase()}${type.slice(1)}Item`]


  const itemProps = useMemo(() => ({ [type]: source }), [source, type])


  const currentUser = useSelector(selectCurrentUser)
  const { id: currentUserId } = currentUser || {}

  const editorRole = useSelector(state =>
    selectRoleByUserIdAndType(state, currentUserId, 'editor'))

  const testifierRole = useSelector(state =>
    selectRoleByUserIdAndType(state, currentUserId, 'testifier'))

  const reviewerRole = useSelector(state =>
    selectRoleByUserIdAndType(state, currentUserId, 'reviewer'))
  const canReview = typeof reviewerRole !== 'undefined'
  const canTestify = typeof testifierRole !== 'undefined'
  const canVerdict = typeof editorRole !== 'undefined'

  const { id: currentUserReviewId } = useSelector(state =>
    selectCurrentUserReviewByContentId(state, id)) || {}

    const { id: currentUserAppearanceId } = useSelector(state =>
      selectCurrentUserAppearanceByClaimId(state, id)) || {}

  const sourceJoin = { key: `${type}Id`, value: id }
  const { id: verdictId } = useSelector(state =>
    selectEntitiesByKeyAndJoin(state, 'verdicts', sourceJoin)[0]) || {}


  const redirectToContent = useCallback(id =>
    history.push(`/${type}s/${id}`), [history, type])


  return (
    <Item
      {...itemProps}
      onClickEdit={redirectToContent}
    >
      {canVerdict && (
        <NavLink
          to={
            verdictId
              ? `/verdicts/${verdictId}/modification`
              : `/verdicts/creation?${type}Id=${id}`
          }
        >
          {verdictId
            ? 'Work on verdict'
            : 'Write your verdict'}
        </NavLink>
      )}
      {canReview && (
        <NavLink
          to={
            currentUserReviewId
              ? `/reviews/${currentUserReviewId}`
              : `/reviews/creation?${type}Id=${id}`
          }
        >
          {currentUserReviewId ? 'See your' : 'Write a'} review
        </NavLink>
      )}
      {canTestify && (
        <NavLink
          to={
            currentUserAppearanceId
              ? `/appearances/${currentUserAppearanceId}`
              : `/appearance/creation?${type}Id=${id}`
          }
        >
          {currentUserAppearanceId ? 'See your' : 'Write an'} appearance
        </NavLink>
      )}
    </Item>
  )
}
