import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const FormFooter = ({
  canEdit,
  canReview,
  canSubmit,
  isLoading,
  match,
  query,
  review
}) => {
  const {
    params: { articleId },
  } = match
  const { isCreatedEntity, readOnly } = query.context()
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
              to={isCreatedEntity ? '/articles' : `/articles/${articleId}`}
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
      {canReview && !isCreatedEntity && (
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
  match: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  review: PropTypes.object
}

export default FormFooter
