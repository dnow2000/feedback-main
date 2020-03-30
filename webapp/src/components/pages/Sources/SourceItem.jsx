import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { selectEntitiesByKeyAndJoin } from 'redux-thunk-data'
import { useQuery } from 'with-react-query'
import { selectCurrentUser } from 'with-react-redux-login'

import ClaimItem from 'components/layout/ClaimItem'
import ArticleItem from 'components/layout/ArticleItem'
import selectCurrentUserReviewByArticleId from 'selectors/selectCurrentUserReviewByArticleId'
import selectCurrentUserAppearanceByClaimId from 'selectors/selectCurrentUserAppearanceByClaimId'
import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'


const ItemsByName = {
  ArticleItem,
  ClaimItem
}


export default ({ source }) => {
  const history = useHistory()
  const { search } = useLocation()
  const { params: { type } } = useQuery(search)
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
    selectCurrentUserReviewByArticleId(state, id)) || {}

    const { id: currentUserAppearanceId } = useSelector(state =>
      selectCurrentUserAppearanceByClaimId(state, id)) || {}

  const sourceJoin = { key: `${type}Id`, value: id }
  const { id: verdictId } = useSelector(state =>
    selectEntitiesByKeyAndJoin(state, 'verdicts', sourceJoin)[0]) || {}


  const redirectToArticle = useCallback(id =>
    history.push(`/${type}s/${id}`), [history, type])


  return (
    <Item
      {...itemProps}
      onClickEdit={redirectToArticle}
    >
      {canVerdict && (
        <NavLink
          className="button is-primary thin"
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
          className={"button is-primary thin"}
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
          className={"button is-primary thin"}
          to={
            currentUserAppearanceId
              ? `/appearances/${currentUserAppearanceId}`
              : `/appearance/creation?${type}Id=${id}`
          }
        >
          {currentUserAppearanceId ? 'See your' : 'Write an'} an appearance
        </NavLink>
      )}
    </Item>
  )
}
