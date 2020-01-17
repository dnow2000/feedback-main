import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

class FormFooter extends PureComponent {
  onCancelClick = () => {
    const { form, history, match, query } = this.props
    const {
      params: { verdictId },
    } = match
    const { isCreatedEntity } = query.context()
    form.reset()
    const next = isCreatedEntity
      ? '/articles'
      : `/verdicts/${verdictId}`
    history.push(next)
  }

  render () {
    const {
      canSubmit,
      isLoading,
      match,
      query
    } = this.props
    const {
      params: { verdictId },
    } = match
    const { isCreatedEntity, readOnly } = query.context()

    return (
      <div className="form-footer">
        {readOnly ? (
          <NavLink
            className="button is-primary thin"
            id="edit-verdict"
            to={`/verdicts/${verdictId}?modification`}
          >
            Edit Verdict
          </NavLink>
        ) : (
          <button
            className="button is-secondary"
            id="cancel-verdict"
            onClick={this.onCancelClick}
            type="button"
          >
            Cancel
          </button>
        )}
        {readOnly ? (
          <NavLink className="button is-secondary" to="/articles">
            Return
          </NavLink>
        ) : (
          <button
            className={classnames('button is-primary thin', {
              'is-loading': isLoading,
            })}
            disabled={!canSubmit}
            id="submit-verdict"
            type="submit"
          >
            {isCreatedEntity ? 'Start Verdict' : 'Submit'}
          </button>
        )}
      </div>
    )
  }
}

FormFooter.defaultProps = {
  canSubmit: false,
  isLoading: false,
}

FormFooter.propTypes = {
  canSubmit: PropTypes.bool,
  form: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool,
  match: PropTypes.shape().isRequired,
  query: PropTypes.shape().isRequired,
}

export default FormFooter
