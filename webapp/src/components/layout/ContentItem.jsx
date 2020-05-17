import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import Dotdotdot from 'react-dotdotdot'

import Icon from 'components/layout/Icon'
import contentType  from 'components/types/contentType'

import { API_THUMBS_URL, ROOT_ASSETS_PATH } from 'utils/config'
import { getFormatPublishedDate } from 'utils/moment'


const round = (x, n) => Math.round(x*10**n) / 10**n


const displaySocialScores = socialScore => {
  if (socialScore > 999999) return `${round(socialScore/1000000, 1)}M`
  if (socialScore > 999) return `${round(socialScore/1000, 0)}k`
  return socialScore
}


const _ = ({
  content,
  children,
  onClickEdit,
  withEditButton,
  withShares,
  withTheme
}) => {
  const {
    authors,
    externalThumbUrl,
    facebookShares,
    id: contentId,
    publishedDate,
    theme,
    thumbCount,
    title,
    totalShares,
    twitterShares,
    url
  } = content || {}
  const formatPublishedDate = useMemo(() =>
    getFormatPublishedDate(publishedDate), [publishedDate])

  const contentImgSrc = externalThumbUrl ||
    (
      thumbCount
        ? `${API_THUMBS_URL}/contents/${contentId}`
        : `${ROOT_ASSETS_PATH}/loading_webshot.png`
    )


  const handleClickEdit = useCallback(() => {
    onClickEdit(contentId)
  }, [contentId, onClickEdit])


  return (
    <content className="content-item">
      <div className="content-container">
        <div className="content-header">
          {withTheme && theme && <p className="content-tag">{theme}</p>}
          <div className="content-date">
            <p >{formatPublishedDate}</p>
            {onClickEdit && (
              <button className="content-edit" onClick={handleClickEdit}>
                <Icon className="icon" name="ico-edit.svg" />
              </button>
              )
            }
          </div>
        </div>
        <div className="content-summary">
          <div className="content-summary-thumbnail">
            <img
              alt="Content illustration"
              className="thumbnail-image"
              src={contentImgSrc}
            />
          </div>
          <div className="content-summary-container">
            <Dotdotdot className="content-title" clamp={4}>
              {title}
            </Dotdotdot>
            <Dotdotdot clamp={2}>
              {((authors) || '')
                .split(';')
                .filter(author => author)
                .map(author => (
                  <p className="content-author" key={author}>
                    {author}
                  </p>
                )
              )}
            </Dotdotdot>
            <a
              className="content-link"
              href={url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Read the content
            </a>
          </div>
        </div>
        {withShares && (
          <div className="social-scores-container">
            <div className="separated-scores">
              <p>
                {displaySocialScores(totalShares)} Share
              </p>
            </div>
            <div className="separated-scores">
              <div className="score">
                <Icon className="icon" name="ico-fb.svg" />
                <p>{displaySocialScores(facebookShares)}</p>
              </div>
              <div className="score">
                <Icon className="icon" name="ico-twtr.svg" />
                <p>{displaySocialScores(twitterShares)}</p>
              </div>
            </div>
          </div>
        )}
        <div className="content-cta-container">
          {children}
        </div>
      </div>
    </content>
  )
}

_.defaultProps = {
  content: null,
  onClickEdit: null,
  withEditButton: false,
  withShares: true,
  withTheme: false
}

_.propTypes = {
  content: contentType,
  onClickEdit: PropTypes.func,
  withEditButton: PropTypes.bool,
  withShares: PropTypes.bool,
  withTheme: PropTypes.bool
}

export default _
