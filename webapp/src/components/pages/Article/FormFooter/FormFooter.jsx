import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import getFormParams from '../../../../utils/getFormParams'

class FormFooter extends Component {

  getArticleFormParams = () =>
    getFormParams('article', this.props)

  render () {
    const {
      canEdit,
      canReview,
      canSubmit,
      formParams,
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
    } = this.getArticleFormParams()
    const { id: reviewId } = review || {}

    return (
      <div className="control level">
        {canEdit && (
          <Fragment>
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
