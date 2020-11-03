import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEntityByKeyAndId } from 'redux-thunk-data'

import Icon from 'components/layout/Icon'
import selectConclusionTagByVerdictId from 'selectors/selectConclusionTagByVerdictId'
import { numberShortener } from 'utils/shorteners'
import useTimeAgo from 'components/uses/useTimeAgo'


const _ = ({ asLink, className, verdict, withQuotationsAndShares }) => {
  const history = useHistory()
  const {
    claimId,
    id,
    medium,
    title: headline,
    scienceFeedbackPublishedDate: publishedDate,
    scienceFeedbackUrl: reviewUrl,
    type
  } = verdict
  const timeAgo = useTimeAgo(publishedDate)


  const claim = useSelector(state =>
    selectEntityByKeyAndId(state, 'claims', claimId)) || {}
  const { linksCount, sharesCount } = claim

  const conclusionTag = useSelector(state =>
    selectConclusionTagByVerdictId(state, id)) || {}


  const handlePushToTestimony = useCallback(() => {
    if (!asLink) return
    history.push(`/verdicts/${id}/testimony`)
  }, [asLink, history, id])

  const ViewReviewButton = () => {
    if (reviewUrl) {
      return (
        <a
          href={reviewUrl}
          rel='noopener noreferrer'
          target="_blank"
        >
          {'Read full review'}
        </a>
      )
    }
  }

  const quotations = withQuotationsAndShares ? (
    <>
      { linksCount > 0 && (
        <span className="tag text-center social-tag">
          <strong className="text-primary">
            { linksCount }
          </strong>
          <span>
            {' Links'}
          </span>
        </span>
      ) }
      { sharesCount > 0 && (
        <span className="tag text-center social-tag">
          <strong className="text-primary">
            { numberShortener(sharesCount) }
          </strong>
          <span>
            {' Interactions'}
          </span>
        </span>
      ) }
    </>
  ) : <ViewReviewButton />


  return (
    <div
      className={classnames('verdict-item', className, { 'clickable': asLink })}
      onClick={handlePushToTestimony}
      onKeyPress={handlePushToTestimony}
      role="link"
      tabIndex={id}
    >
      <h3>
        {`${headline || claim.text}`}
      </h3>
      {medium && (<div className="verdict-medium">
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
        { timeAgo && (
          <strong>
            { timeAgo }
          </strong>
        ) }
      </div>)}
      <br />
      <hr />
      <br />
      <p>
        <b>
          {`${type?.replace(/^./, type.charAt(0).toUpperCase())}: `}
        </b>
        <i>
          {`"${claim.text}"`}
        </i>
      </p>
      <br />
      <div className="tags">
        { conclusionTag.label && (
          <span className={`tag text-center ${(conclusionTag.label.split(' ').join('-') || '').toLowerCase()}`}>
            {conclusionTag.label}
          </span>
        )}
        { quotations }
      </div>
    </div>
  )
}


_.defaultProps = {
  asLink: true,
  className: null,
  withQuotationsAndShares: true
}


_.propTypes = {
  asLink: PropTypes.bool,
  className: PropTypes.string,
  verdict: PropTypes.shape({
    claim: PropTypes.shape({
      text: PropTypes.string.isRequired
    }),
    claimId: PropTypes.string,
    id: PropTypes.string,
    medium: PropTypes.shape({
      logoUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    scienceFeedbackPublishedDate: PropTypes.string,
    scienceFeedbackUrl: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  withQuotationsAndShares: PropTypes.bool
}

export default _
