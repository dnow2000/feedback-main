import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Dotdotdot from 'react-dotdotdot'
import { selectEntitiesByKeyAndJoin } from 'redux-thunk-data'
import { selectCurrentUser } from 'with-react-redux-login'

import Icon from 'components/layout/Icon'
import articleType  from 'components/types/articleType'
import selectCurrentUserReviewByArticleId from 'selectors/selectCurrentUserReviewByArticleId'
import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'
import { API_THUMBS_URL, ROOT_ASSETS_PATH } from 'utils/config'
import { getFormatPublishedDate } from 'utils/moment'

const round = (x, n) => Math.round(x*10**n) / 10**n

const displaySocialScores = socialScore => {
  if (socialScore > 999999) return `${round(socialScore/1000000, 1)}M`
  if (socialScore > 999) return `${round(socialScore/1000, 0)}k`
  return socialScore
}

const ArticleItem = ({
  article,
  noControl,
  onClickEdit,
  withEditButton,
  withShares,
  withTheme
}) => {
  const {
    authors,
    externalThumbUrl,
    facebookShares,
    id: articleId,
    publishedDate,
    theme,
    thumbCount,
    title,
    totalShares,
    twitterShares,
    url
  } = article || {}
  const formatPublishedDate = useMemo(() =>
    getFormatPublishedDate(publishedDate), [publishedDate])

  const currentUser = useSelector(selectCurrentUser)
  const { id: currentUserId } = currentUser || {}
  const editorRole = useSelector(state =>
    selectRoleByUserIdAndType(state, currentUserId, 'editor'))
  const reviewerRole = useSelector(state =>
    selectRoleByUserIdAndType(state, currentUserId, 'reviewer'))
  const canReview = typeof reviewerRole !== 'undefined'
  const canVerdict = typeof editorRole !== 'undefined'

  const { id: currentUserReviewId } = useSelector(state =>
    selectCurrentUserReviewByArticleId(state, articleId)) || {}

  const articleJoin = { key: 'articleId', value: articleId }

  const { id: verdictId } = useSelector(state =>
    selectEntitiesByKeyAndJoin(state, 'verdicts', articleJoin)[0]) || {}

  const articleImgSrc = externalThumbUrl ||
    (
      thumbCount
        ? `${API_THUMBS_URL}/articles/${articleId}`
        : `${ROOT_ASSETS_PATH}/loading_webshot.png`
    )
  return (
    <article className="article-item">
      <div className="article-container">
        <div className="article-header">
          {withTheme && theme && <p className="article-tag">{theme}</p>}
          <div className="article-date">
            <p >{formatPublishedDate}</p>
            {onClickEdit && (
              <button className="article-edit" onClick={onClickEdit}>
                <Icon className="icon" name="ico-edit.svg" />
              </button>
              )
            }
          </div>
        </div>
        <div className="article-summary">
          <div className="article-summary-thumbnail">
            <img
              alt="Article illustration"
              className="thumbnail-image"
              src={articleImgSrc}
            />
          </div>
          <div className="article-summary-container">
            <Dotdotdot className="article-title" clamp={4}>
              {title}
            </Dotdotdot>
            <Dotdotdot clamp={2}>
              {((authors) || '')
                .split(';')
                .filter(author => author)
                .map(author => (
                  <p className="article-author" key={author}>
                    {author}
                  </p>
                )
              )}
            </Dotdotdot>
            <a
              className="article-link"
              href={url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Read the article
            </a>
          </div>
        </div>
        {withShares && (
          <div className="social-scores-container">
            <div className="separated-scores">
              <p>
                {displaySocialScores(totalShares)} Share
              </p>
            </div>
            <div className="separated-scores">
              <div className="score">
                <Icon className="icon" name="ico-fb.svg" />
                <p>{displaySocialScores(facebookShares)}</p>
              </div>
              <div className="score">
                <Icon className="icon" name="ico-twtr.svg" />
                <p>{displaySocialScores(twitterShares)}</p>
              </div>
            </div>
          </div>
        )}
        {!noControl && (
          <div className="article-cta-container">
            {canVerdict && (
              <NavLink
                className="button is-primary thin"
                to={
                  verdictId
                    ? `/verdicts/${verdictId}/modification`
                    : `/verdicts/creation?articleId=${articleId}`
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
                    : `/reviews/creation?articleId=${articleId}`
                }
              >
                {currentUserReviewId ? 'See' : 'Write'} a review
              </NavLink>
            )}
          </div>)}
      </div>
    </article>
  )
}

ArticleItem.defaultProps = {
  article: null,
  noControl: false,
  onClickEdit: null,
  verdict: null,
  withEditButton: false,
  withShares: true,
  withTheme: false
}

ArticleItem.propTypes = {
  article: articleType,
  noControl: PropTypes.bool,
  onClickEdit: PropTypes.func,
  withEditButton: PropTypes.bool,
  withShares: PropTypes.bool,
  withTheme: PropTypes.bool
}

export default ArticleItem
