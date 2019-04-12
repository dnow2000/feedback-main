import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'
import { selectCurrentUser } from 'with-login'

import Authors from '../../../layout/Authors'
import Extract from '../../../layout/Extract'
import Tag from '../../../layout/Tag'
import {
  selectCurrentUserReviewByArticleId,
  selectCurrentUserVerdictByArticleId,
  selectEditorRoleByUserId,
  selectReviewerRoleByUserId,
  selectReviewsByArticleId
} from '../../../../selectors'
import { ROOT_PATH, THUMBS_URL } from '../../../../utils/config'

class ArticleItem extends Component {
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
              <span className="total-shares mr8">
                {totalShares}
              </span>
            )}
            {facebookShares && (
              <span className="mr8">
                - Facebook: <strong>{facebookShares}</strong>
              </span>)}
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
              <a
                className="title mb16 fs22"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>
                  {title}
                </strong>
              </a>
              <div className="infos flex-columns items-center py12">
                <div className="authors mr24">
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
                    : `/verdicts/new?articleId=${id}`
                }
              >
                {currentUserVerdictId ? 'See' : 'Create'} your verdict
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
                {currentUserReviewId ? 'See' : 'Create'} your review
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

function mapStateToProps(state, ownProps) {
  const { article } = ownProps
  const { id: articleId } = article || {}
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectEditorRoleByUserId(state, currentUserId)
  const reviewerRole = selectReviewerRoleByUserId(state, currentUserId)

  const canDelete = typeof editorRole !== 'undefined'
  const canReview = typeof reviewerRole !== 'undefined'
  const canVerdict = typeof editorRole !== 'undefined'

  const currentUserReview = selectCurrentUserReviewByArticleId(state, articleId)

  const reviews = selectReviewsByArticleId(state, articleId)
  const hasReviews = reviews && reviews.length > 0
  const showSeeAllReviews = typeof editorRole !== 'undefined' && hasReviews

  const currentUserVerdict = selectCurrentUserVerdictByArticleId(state, articleId)

  return {
    canDelete,
    canReview,
    canVerdict,
    currentUserReview,
    currentUserVerdict,
    hasReviews,
    showSeeAllReviews
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ArticleItem)
