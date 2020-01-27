import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'
import Dotdotdot from 'react-dotdotdot'

import Icon from 'components/layout/Icon'
import articleType  from 'components/types/articleType'
import { API_THUMBS_URL, ROOT_ASSETS_PATH } from 'utils/config'

const round = (x, n) => {
  return Math.round(x*10**n) / 10**n
}

const displaySocialScores = socialScore => {
  if (socialScore > 999999){
    return `${round(socialScore/1000000, 1)}M`
  }
  if (socialScore > 999){
    return `${round(socialScore/1000, 0)}k`
  }
  return socialScore
}

const ArticleItem = ({
  article,
  canDelete,
  canReview,
  canVerdict,
  currentUserReview,
  dispatch,
  match,
  noControl,
  onClickEdit,
  showSeeAllReviews,
  verdict,
  withEditButton,
  withShares
}) => {
  const {
    authors,
    externalThumbUrl,
    facebookShares,
    id,
    summary,
    theme,
    thumbCount,
    title,
    totalShares,
    twitterShares,
    url
  } = article || {}
  const { params: { articleId: routeArticleId } } = match
  const { id: currentUserReviewId } = currentUserReview || {}
  const { id: verdictId } = verdict || {}

  const onDeleteClick = useCallback(() => {
    dispatch(requestData({
      apiPath: `/articles/${id}`,
      method: 'DELETE'
    }))
  }, [dispatch])

  const articleImgSrc = externalThumbUrl ||
    (
      thumbCount
        ? `${API_THUMBS_URL}/articles/${id}`
        : `${ROOT_ASSETS_PATH}/loading_webshot.png`
    )
  return (
    <article className="article-item">
      <div
        className="article-container"
      >

        <div className="article-header">
          <p className="article-tag">Climate</p>
          <div className="article-date">
            <p >4 Dec 2019</p>
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
              src={externalThumbUrl}
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
                    : `/verdicts/creation?articleId=${id}`
                }
              >
                Edit Verdict
              </NavLink>
            )}
            {canReview && (
              <NavLink
                className={"button is-primary thin"}
                to={
                  currentUserReviewId
                    ? `/reviews/${currentUserReviewId}`
                    : `/reviews/creation?articleId=${id}`
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
  canDelete: false,
  canReview: false,
  canVerdict: false,
  currentUserReview: null,
  noControl: false,
  onClickEdit: null,
  showSeeAllReviews: false,
  verdict: null,
  withShares: true,
}

ArticleItem.propTypes = {
  article: articleType,
  canDelete: PropTypes.bool,
  canReview: PropTypes.bool,
  canVerdict: PropTypes.bool,
  currentUserReview: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  noControl: PropTypes.bool,
  onClickEdit: PropTypes.func,
  showSeeAllReviews: PropTypes.bool,
  verdict: PropTypes.object,
  withEditButton: PropTypes.bool,
  withShares: PropTypes.bool,
}

export default ArticleItem
