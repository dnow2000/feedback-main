import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEntityByKeyAndId } from 'redux-thunk-data'

import Icon from 'components/layout/Icon'
import selectConclusionTagByVerdictId from 'selectors/selectConclusionTagByVerdictId'
import selectSortedAppearancesByQuotedClaimId from 'selectors/selectSortedAppearancesByQuotedClaimId'
import { numberShortener } from 'utils/shorteners'


const _ = ({ className, verdict, withLinksShares }) => {
  const history = useHistory()
  const { claimId, id, medium, title: headline } = verdict


  const claim = useSelector(
    state => selectEntityByKeyAndId(state, 'claims', claimId),
    [claimId]
  ) || {}

  const appearances = useSelector(state =>
    selectSortedAppearancesByQuotedClaimId(state, claimId)) || {}
  const linkCount = appearances?.length
  const shareCount = appearances
                      ?.map(appearance => appearance.quotingContent.totalShares)
                      ?.reduce((a, b) => a + b, 0)

  const conclusionTag = useSelector(
    state => selectConclusionTagByVerdictId(state, id),
    [id]
  ) || {}

  const handleClick = useCallback(
    () => history.push(`/verdicts/${id}/appearances`),
    [history, id]
  )

  const links = withLinksShares ? (
    <>
      { linkCount && (
        <span className="tag text-center social-tag">
          <strong className="text-primary">
            { linkCount }
          </strong>
          <span>
            {' Links'}
          </span>
        </span>
      ) }
      { shareCount && (
        <span className="tag text-center social-tag">
          <strong className="text-primary">
            { numberShortener(shareCount) }
          </strong>
          <span>
            {' Shares'}
          </span>
        </span>
      ) }
    </>
  ) : (
    <button
      className="button is-primary is-outlined thin"
      type='button'
    >
      {'Read full review'}
    </button>
  )


  return (
    <div
      className={classnames('verdict-item', className)}
      onClick={handleClick}
    >
      <h4>
        {`"${headline || claim.text}"`}
      </h4>
      <div className="verdict-editor-container">
        <Icon
          className="avatar editor-avatar"
          path={medium.logoUrl}
        />
        <strong>
          { medium.name }
        </strong>
        <span className="text-muted">
          &nbsp;
          {'checked it'}
          &nbsp;
        </span>
        <strong>
          {`${3} days ago`}
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
        { conclusionTag.label && <span className={`tag text-center ${(conclusionTag.label || '').toLowerCase()}`}>
          {conclusionTag.label}
        </span> }
        { links }
      </div>
    </div>
  )
}


_.defaultProps = {
  className: null,
  withLinksShares: true
}


_.propTypes = {
  className: PropTypes.string,
  verdict: PropTypes.shape({
    claim: PropTypes.shape({
      text: PropTypes.string.isRequired
    }),
    title: PropTypes.string,
    claimId: PropTypes.string,
    id: PropTypes.string,
    medium: PropTypes.shape({
      logoUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    verdictTags: PropTypes.arrayOf(
      PropTypes.shape({
        tag: PropTypes.shape({
          label: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
  withLinksShares: PropTypes.bool
}

export default _
