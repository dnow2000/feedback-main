import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'

import Icon from 'components/layout/Icon'
import Authors from 'components/layout/Authors'
import Extract from 'components/layout/Extract'
import Tag from 'components/layout/Tag'
import { API_THUMBS_URL, ROOT_ASSETS_PATH } from 'utils/config'

function round(x, n) {
  return Math.round(x*10**n) / 10**n
}

class ArticleItem extends PureComponent {
  onDeleteClick = () => {
    const { article, dispatch } = this.props
    const { id } = article
    dispatch(requestData({
      apiPath: `/articles/${id}`,
      method: 'DELETE'
    }))
  }

  displaySocialScores(socialScore) {
    if (socialScore > 999999){
      return `${round(socialScore/1000000, 1)}M`
    }
    if (socialScore > 999){
      return `${round(socialScore/1000, 0)}k`
    }
    return socialScore
  }

  render () {
    const {
      article,
      canDelete,
      canReview,
      canVerdict,
      currentUserReview,
      currentUserVerdict,
      match,
      noControl,
      showSeeAllReviews,
      withShares
    } = this.props
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

    const articleImgSrc = externalThumbUrl ||
      (
        thumbCount
          ? `${API_THUMBS_URL}/articles/${id}`
          : `${ROOT_ASSETS_PATH}/loading_webshot.png`
      )

    return (
      <article className="article-item">
        <NavLink
          className="article-container"
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          to={`/articles/${id}`}
        >
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
              <p className="article-title">
                {title}
              </p>
              {((authors) || '')
                .split(';')
                .filter(author => author)
                .map(author => (
                  <p className="article-author" key={author}>
                    {author}
                  </p>
                )
              )}
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
                  {this.displaySocialScores(totalShares)} Share
                </p>
              </div>
              <div className="separated-scores">
                <div className="score">
                  <Icon className="icon" name="ico-fb.svg" />
                  <p>{this.displaySocialScores(facebookShares)}</p>
                </div>
                <div className="score">
                  <Icon className="icon" name="ico-twtr.svg" />
                  <p>{this.displaySocialScores(twitterShares)}</p>
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
        </NavLink>
      </article>
    )
  }
}

ArticleItem.defaultProps = {
  article: null,
  canDelete: false,
  canReview: false,
  canVerdict: false,
  currentUserReview: null,
  currentUserVerdict: null,
  noControl: false,
  showSeeAllReviews: false,
  withShares: true
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
  showSeeAllReviews: PropTypes.bool,
  withShares: PropTypes.bool,
}

export default ArticleItem
