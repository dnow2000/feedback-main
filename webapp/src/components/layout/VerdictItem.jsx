import classnames from "classnames"
import PropTypes from "prop-types"
import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

import { selectEntityByKeyAndId } from "redux-thunk-data"

import Avatar from 'components/layout/Avatar'

const VerdictItem = ({ className, verdict }) => {
  const { claimId, editor, id, title: headline } = verdict
  const claim = useSelector(
    (state) => selectEntityByKeyAndId(state, "claims", claimId),
    [claimId]
  )

  const verdictTag = useSelector(
    state => selectEntityByKeyAndId(state, 'verdictTags', id),
    [id]
  )

  const tag = useSelector(
    state => selectEntityByKeyAndId(state, 'tags', verdictTag.tagId),
    [verdictTag]
  )

  const history = useHistory()

  const handleClick = useCallback(() => history.push(`/verdicts/${id}`), [
    history,
    id,
  ])

  return (
    <div
      className={classnames("verdict-item", className)}
      onClick={handleClick}
    >
      <h4>
        {`"${claim.text}"`}
      </h4>
      <div className="verdict-editor-container">
        <Avatar
          className="avatar editor-avatar"
          user={editor}
        />
        <strong>
          {`${editor.firstName} ${editor.lastName}`}
        </strong>
        <span className="text-muted">
          &nbsp;{'checked it'}
        </span>
        <strong>
          &nbsp;{`${3} days ago`}
        </strong>
      </div>
      <br />
      <hr className="text-muted w-25" />
      <br />
      <p>
        <i>
          {`"${claim.text}"`}
        </i>
      </p>
      <br />
      <div className="tags">
        <span className={`tag text-center ${tag.label.toLowerCase()}`}>
          {tag.label}
        </span>
        <span className="tag text-center social-tag">
          <strong className="text-primary">
            {'34'}
          </strong>
          <span>
            {' Links'}
          </span>
        </span>
        <span className="tag text-center social-tag">
          <strong className="text-primary">
            {'42k'}
          </strong>
          <span>
            {' Shares'}
          </span>
        </span>
      </div>
    </div>
  )
}

VerdictItem.defaultProps = {
  className: null
}

VerdictItem.propTypes = {
  className: PropTypes.string,
  verdict: PropTypes.shape({
    claim: PropTypes.shape({
      text: PropTypes.string.isRequired
    }),
    title: PropTypes.string,
    claimId: PropTypes.string,
    editor: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
    id: PropTypes.string,
    verdictTags: PropTypes.arrayOf(
      PropTypes.shape({
        tag: PropTypes.shape({
          label: PropTypes.string,
        }),
      })
    ),
  }).isRequired
}

export default VerdictItem
