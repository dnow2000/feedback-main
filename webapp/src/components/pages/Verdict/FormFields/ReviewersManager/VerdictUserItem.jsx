import capitalize from 'lodash.capitalize'
import { stringify } from 'query-string'
import React, { useCallback } from 'react'
import Dotdotdot from 'react-dotdotdot'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'
import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'

import Avatar from 'components/layout/Avatar'
import selectTagsByUserId from 'selectors/selectTagsByUserId'
import { APP_NAME } from 'utils/config'


const mapArgsToCacheKey = (state, articleId, userId) => `${articleId || ''}/${userId || ''}`
const selectReviewByArticleIdAndUserId = createCachedSelector(
  state => state.data.reviews,
  (state, articleId) => articleId,
  (state, articleId, userId) => userId,
  (reviews, articleId, userId) =>
    reviews && reviews.find(
      review => review.articleId === articleId && review.userId === userId
    )
)(mapArgsToCacheKey)


export default ({ user }) => {
  const dispatch = useDispatch()
  const { verdictId } = useParams()
  const { email, id: userId, publicName } = user

  const verdict = useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))
  const { articleId } = verdict

  const { id: reviewId, evaluationId } = useSelector(state =>
    selectReviewByArticleIdAndUserId(state, articleId, userId)) || {}

  const { value: evaluationValue } = useSelector(state =>
    selectEntityByKeyAndId(state, 'evaluations', evaluationId)) || {}

  const { publicName: currentPublicName } = useSelector(selectCurrentUser) || {}

  const tags = useSelector(state => selectTagsByUserId(state, userId))

  const reviewUrl = `${window.location.host}/reviews/new?articleId=${articleId}`
  const mailToSearch = stringify({
    body: `<div>Hello ${publicName},
      can you go %3ca href=${reviewUrl} target="_blank"> here </a>
    </div>`,
    subject: `${capitalize(APP_NAME)} you were asked by ${currentPublicName} to review an article`
  })
  const mailTo = `mailto:${email}?${mailToSearch}`

  const handleRemoveUser = useCallback(() => {
    dispatch(requestData({
      apiPath: '/verdictUsers',
      body: {
        userId,
        verdictId
      },
      method: 'DELETE'
    }))
  }, [dispatch, verdictId, userId])


  return (
    <article className="user-item box">
      <div className="content p24">
        <div className="flex-columns items-center">
          <div className="col-25 mr12">
            <Avatar user={user} />
          </div>
          <div className="center">
            <div className="mb4 text-left">
              {publicName}
            </div>
            <div className="flex-start items-center">
              {
                tags.map(({ text }) => (
                  <Dotdotdot className="tag fs12" clamp={60} key={text}>
                    #{text}
                  </Dotdotdot>
                ))
              }
            </div>
          </div>
          <div className="col-20" />
          <a className="button is-secondary mr8" href={mailTo}>
            Contact
          </a>
          <div>
            {
              reviewId
                ? (
                  <NavLink
                    className='button is-primary see-verdict-review mr12'
                    to={`/reviews/${reviewId}`}
                  >
                    {evaluationValue || 'See Review'}
                  </NavLink>
                )
              : (
                <div className='mr24'>
                  No review yet
                </div>
              )
            }
          </div>
          <button
            className="button is-primary"
            onClick={handleRemoveUser}
            type="button"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  )
}
