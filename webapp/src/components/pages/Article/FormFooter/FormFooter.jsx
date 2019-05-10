import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const FormFooter = ({
  canEdit,
  canReview,
  canSubmit,
  form,
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
            <button
              className="button is-primary"
              id="edit-article"
              onClick={() => {
                query.changeToModification()
              }}
              type="button"
            >
              Edit Article
            </button>
          ) : (
            <button
              className="button is-secondary"
              id="cancel-article"
              onClick={() => {
                form.reset()
                query.changeToReadOnly()
              }}
              type="button"
            >
              Cancel
            </button>
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
  form: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool,
  match: PropTypes.shape().isRequired,
  query: PropTypes.shape().isRequired,
  review: PropTypes.object
}

export default FormFooter
