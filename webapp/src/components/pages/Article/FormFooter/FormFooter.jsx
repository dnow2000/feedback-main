import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

class FormFooter extends PureComponent {
  render () {
    const {
      canEdit,
      canReview,
      canSubmit,
      form,
      history,
      isLoading,
      match,
      resetForm,
      review
    } = this.props
    const {
      params: { articleId },
    } = match
    const {
      isCreatedEntity,
      modificationUrl,
      readOnly,
      readOnlyUrl
    } = form
    const { id: reviewId } = review || {}

    return (
      <div className="control level">
        {canEdit && (
          <>
            {readOnly ? (
              <button
                className="button is-primary"
                id="edit-article"
                onClick={() =>
                  history.push(modificationUrl)
                }
                type="button"
              >
                Edit Article
              </button>
            ) : (
              <button
                className="button is-secondary"
                id="cancel-article"
                onClick={() => {
                  resetForm()
                  history.push(readOnlyUrl)
                }}
                type="button"
              >
                Cancel
              </button>
            )}
          </>
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
  form: PropTypes.shape({
    isCreatedEntity: PropTypes.bool,
    modificationUrl: PropTypes.string,
    readOnly: PropTypes.string,
    readOnlyUrl: PropTypes.string
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool,
  match: PropTypes.shape().isRequired,
  query: PropTypes.shape().isRequired,
  resetForm: PropTypes.shape().isRequired,
  review: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
}

export default FormFooter
