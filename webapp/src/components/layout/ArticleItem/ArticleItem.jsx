import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'
import Dotdotdot from 'react-dotdotdot'

import Icon from 'components/layout/Icon'
import Authors from 'components/layout/Authors'
import Extract from 'components/layout/Extract'
import Tag from 'components/layout/Tag'
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
  currentUserVerdict,
  dispatch,
  match,
  noControl,
  onClickEdit,
  showSeeAllReviews,
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
  } = article
  const { params: { articleId: routeArticleId } } = match
  const { id: currentUserReviewId } = currentUserReview || {}
  const { id: currentUserVerdictId } = currentUserVerdict || {}

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
        {onClickEdit && (
          <button classname="article-edit" onClick={onClickEdit}>{"EDIT"}</button>
          )
        }
        <div className="article-header">
          <p className="article-tag">Climate</p>
          <p className="article-date">4 Dec 2019</p>
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
                  currentUserVerdictId
                    ? `/verdicts/${currentUserVerdictId}`
                    : `/verdicts/creation?articleId=${id}`
                }
              >
                See Verdict
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
  currentUserVerdict: null,
  noControl: false,
  onClickEdit: null,
  showSeeAllReviews: false,
  withShares: true,
}

ArticleItem.propTypes = {
  article: PropTypes.object,
  canDelete: PropTypes.bool,
  canReview: PropTypes.bool,
  canVerdict: PropTypes.bool,
  currentUserReview: PropTypes.object,
  currentUserVerdict: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  noControl: PropTypes.bool,
  onClickEdit: PropTypes.func,
  showSeeAllReviews: PropTypes.bool,
  withEditButton: PropTypes.bool,
  withShares: PropTypes.bool,
}

export default ArticleItem
