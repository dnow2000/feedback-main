import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'

import { Icon } from '../../../layout/Icon'
import Authors from '../../../layout/Authors'
import Extract from '../../../layout/Extract'
import Tag from '../../../layout/Tag'
import { ROOT_PATH, THUMBS_URL } from '../../../../utils/config'

class ArticleItem extends PureComponent {
  onDeleteClick = () => {
    const { article, dispatch } = this.props
    const { id } = article
    dispatch(requestData({
      apiPath: `/articles/${id}`,
      method: 'DELETE'
    }))
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
      showSeeAllReviews
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
          ? `${THUMBS_URL}/articles/${id}`
          : `${ROOT_PATH}/images/loading_webshot.png`
      )

    return (
      <article className="article-item box">
        <div className="content pb8 pt24 pl24 pr24">
          <div className="flex-columns items-center flex-wrap mb12">
            {totalShares && (
              <span className="mr8">
                - Total social media share: <strong>{totalShares}</strong>
              </span>
            )}
            {facebookShares && (
              <span className="mr8">
                - Facebook: <strong>{facebookShares}</strong>
              </span>
            )}
            {twitterShares && (
              <span>
                - Twitter: <strong>{twitterShares}</strong>
              </span>
            )}
          </div>
          <div className="flex-columns items-center flex-wrap mb12">
            <div className="col-tablet-25 text-center mr12">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <img
                  alt="Webshot"
                  className="screenshot"
                  src={articleImgSrc}
                />
              </a>
            </div>
            <div className="col-tablet-75">
              <div className="title mb16 fs22 is-bold">
                {title}
              </div>
              <div className="fs14">
                <span className="mr6">
                  You can read the full article here
                </span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="icon" svg="external-link" />
                </a>
              </div>
              <div className="infos flex-columns items-center py12">
                <div className="mr24">
                  <Authors text={authors} />
                </div>
                {theme && (
                  <div className="flex-start items-center">
                    <Tag theme={theme} />
                  </div>
                )}
              </div>
            </div>
          </div>
          {!routeArticleId && <Extract text={summary} />}
        </div>
        {!noControl && (
          <nav className="control flex-wrap flex-start items-center p12">
            {!routeArticleId && (
              <NavLink
                className={`button is-secondary see-${currentUserReviewId ? "current-user-reviewed-" : ""}article`}
                to={`/articles/${id}`}
              >
                See article
              </NavLink>
            )}
            {canVerdict && (
              <NavLink
                className={`button
                  editor
                  is-primary
                  ${currentUserReviewId ? "see" : "create"}-current-user-verdict`
                }
                to={
                  currentUserVerdictId
                    ? `/verdicts/${currentUserVerdictId}`
                    : `/verdicts/creation?articleId=${id}`
                }
              >
                {currentUserVerdictId ? 'See' : 'Write'} your verdict
              </NavLink>
            )}
            {showSeeAllReviews && (
              <NavLink
                className='button editor is-primary see-article-reviews'
                to={`/reviews?articleId=${id}`}
              >
                See all reviews
              </NavLink>
            )}
            {canDelete && (
              <button
                className="button editor is-primary"
                onClick={this.onDeleteClick}
                type="button"
              >
                Delete article
              </button>
            )}
            {canReview && (
              <NavLink
                className={`button
                  reviewer
                  is-primary
                  ${currentUserReviewId ? "see" : "create"}-current-user-review`
                }
                to={
                  currentUserReviewId
                    ? `/reviews/${currentUserReviewId}`
                    : `/reviews/creation?articleId=${id}`
                }
              >
                {currentUserReviewId ? 'See' : 'Write'} your review
              </NavLink>
            )}
          </nav>
        )}
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
  showSeeAllReviews: false
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
  showSeeAllReviews: PropTypes.bool
}

export default ArticleItem
