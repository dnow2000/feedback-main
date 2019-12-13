import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'
import Icon from 'components/layout/Icon'



function round(x, n) {
  return Math.round(x*10**n) / 10**n
}

class TrendingItem extends PureComponent {
  constructor () {
    super()
    this.state = {
      isDismissed: false,
      isReviewable: undefined,
    }
  }

  handleSaveTrending = trendingExtraData => () => {
    const { dispatch, trending } = this.props

    const body = {
      ...trending,
      ...trendingExtraData
    }

    delete body.id

    this.setState({
      isReviewable: trendingExtraData && trendingExtraData.isReviewable
    })

    dispatch(requestData({
      apiPath: '/articles',
      body,
      handleSuccess: () => this.setState({ isDismissed: true }),
      method: 'POST',
    }))
  }

  displaySocialScores(socialScore) {
    if (socialScore > 999999){
      return `${round(socialScore/1000000, 1)}M`
    }
    if (socialScore > 999){
      return `${round(socialScore/1000, 0)}k`
    }
    return socialScore
  }

  render () {
    const {
      trending,
    } = this.props
    const {
      authors,
      externalThumbUrl,
      facebookShares,
      id,
      subdomain,
      title,
      totalShares,
      twitterShares,
      url
    } = trending
    const { isDismissed, isReviewable } = this.state

    return (
      <article className="trending-item">
        <NavLink
          className="trending-container"
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          to={`/articles/creation?trendingId=${id}`}
        >
          <div className="trending-header">
            <p className="trending-tag">Climate</p>
            <p className="trending-date">4 Dec 2019</p>
          </div>
          <div className="trending-summary">
            <div className="trending-summary-thumbnail">
              <img
                alt="Article illustration"
                className="thumbnail-image"
                src={externalThumbUrl}
              />
            </div>
            <div className="trending-summary-container">
              <p className="trending-title">
                {title}
              </p>
              {((subdomain || authors) || '')
                .split(';')
                .filter(author => author)
                .map(author => (
                  <p className="trending-author" key={author}>
                    {author}
                  </p>
                )
              )}
              <a
                className="trending-link"
                href={url}
                rel="noopener noreferrer"
                target="_blank"
              >
                Read the article
              </a>
            </div>
          </div>
          <div className="social-scores-container">
            <div className="separated-scores">
              <p>
                {this.displaySocialScores(totalShares)} Share
              </p>
            </div>
            <div className="separated-scores">
              <div className="score">
                <Icon className="icon" name="ico-fb.svg" />
                <p>{this.displaySocialScores(facebookShares)}</p>
              </div>
              <div className="score">
                <Icon className="icon" name="ico-twtr.svg" />
                <p>{this.displaySocialScores(twitterShares)}</p>
              </div>
            </div>
          </div>
        </NavLink>
      </article>
    )
  }
}

TrendingItem.defaultProps = {
  trending: null,
}

TrendingItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  trending: PropTypes.object,
}

export default TrendingItem
