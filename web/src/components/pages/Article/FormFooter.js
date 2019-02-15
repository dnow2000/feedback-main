import classnames from 'classnames'
import { selectCurrentUser } from 'pass-culture-shared'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { selectNewOrEditEntityContextFromLocation } from '../../form/utils'
import {
  selectEditorRoleByUserId,
  selectReviewerRoleByUserId,
  selectCurrentUserReviewByArticleId
} from '../../../selectors'

const FormFooter = ({
  canEdit,
  canReview,
  canSubmit,
  isLoading,
  location,
  match,
  review
}) => {
  const {
    params: { articleId },
  } = match
  const newOrEditEntityContext = selectNewOrEditEntityContextFromLocation(
    location
  )
  const { isNewEntity, readOnly } = newOrEditEntityContext || {}
  const { id: reviewId } = review || {}

  return (
    <div className="control level">
      {canEdit && (
        <Fragment>
          {readOnly ? (
            <NavLink
              className="button is-primary"
              id="edit-article"
              to={`/articles/${articleId}?edit`}
            >
              Edit Article
            </NavLink>
          ) : (
            <NavLink
              className="button is-secondary"
              id="cancel-article"
              to={isNewEntity ? '/articles' : `/articles/${articleId}`}
            >
              Cancel
            </NavLink>
          )}
        </Fragment>
      )}
      {readOnly ? (
        <NavLink className="button is-secondary" to="/articles">
          Return
        </NavLink>
      ) : (
        <button
          className={classnames('button is-primary flex-1', {
            'is-loading': isLoading,
          })}
          disabled={!canSubmit}
          id="submit-article"
          type="submit"
        >
          Save Article
        </button>
      )}
      {canReview && !isNewEntity && (
        <NavLink
          className="button is-primary"
          id={`${reviewId ? "see" : "create"}-own-review`}
          to={
            reviewId
              ? `/reviews/${reviewId}`
              : `/reviews/new?articleId=${articleId}`
          }
        >
          {reviewId ? 'See Review' : 'Create Review'}
        </NavLink>
      )}
    </div>
  )
}

FormFooter.defaultProps = {
  canEdit: false,
  canReview: false,
  canSubmit: false,
  isLoading: false,
  review: null
}

FormFooter.propTypes = {
  canEdit: PropTypes.bool,
  canReview: PropTypes.bool,
  canSubmit: PropTypes.bool,
  isLoading: PropTypes.bool,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  review: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  const {
    match: { params: { articleId } },
  } = ownProps
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectEditorRoleByUserId(state, currentUserId)
  const reviewerRole = selectReviewerRoleByUserId(state, currentUserId)

  const canReview = typeof reviewerRole !== 'undefined'
  const canEdit = typeof editorRole !== 'undefined'

  return {
    canEdit,
    canReview,
    review: selectCurrentUserReviewByArticleId(state, articleId)
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(FormFooter)
