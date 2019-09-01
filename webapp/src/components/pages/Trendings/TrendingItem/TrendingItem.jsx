import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Transition from 'react-transition-group/Transition'
import { requestData } from 'redux-saga-data'

const duration = 500;
const defaultStyle = {
  maxHeight: 600,
  transition: `max-height ${duration}ms ease-in-out`,
}

const transitionStyles = {
  entered:  { maxHeight: 0, opacity: 0 },
  entering: { maxHeight: 400, opacity: 1 },
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

  render () {
    const {
      trending,
    } = this.props
    const {
      authors,
      externalThumbUrl,
      facebookShares,
      subdomain,
      title,
      totalShares,
      twitterShares,
      url
    } = trending
    const { isDismissed, isReviewable } = this.state

    return (
      <Transition in={isDismissed} timeout={duration}>
        {state => (
          <div style={{...defaultStyle, ...transitionStyles[state]}}>
            <article className="article-item box">
              <div className="content pt24 pl24 pr24">
                <div className="flex-columns items-center mb12">
                  {totalShares && (
                    <span className="total-shares mr8">
                      {totalShares}
                    </span>
                  )}
                  {facebookShares && (
                    <span className="mr8">
                      - Facebook: <strong>{facebookShares}</strong>
                    </span>)}
                  {twitterShares && (
                    <span>
                      - Twitter: <strong>{twitterShares}</strong>
                    </span>
                  )}
                </div>
                <div className="flex-columns items-center mb12">
                  <div className="col-25 text-center mr12">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      <img
                        alt="Webshot"
                        className="screenshot"
                        src={externalThumbUrl}
                      />
                    </a>
                  </div>
                  <div className="flex-auto center">
                    <a
                      className="title mb16 fs22"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>
                        {title}
                      </strong>
                    </a>
                    <div className="infos flex-columns items-center py12">
                      <div className="authors mr24">
                        {((subdomain || authors) || '')
                          .split(';')
                          .filter(author => author)
                          .map(author => (
                            <p key={author}>
                              {author}
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <nav className="control flex-start items-center p12">
                <button
                  className={classnames("button is-primary is-info", {
                    'is-loading': isReviewable
                  })}
                  onClick={this.handleSaveTrending({ isReviewable: true })}
                  type="button"
                >
                  Reviewable
                </button>
                <button
                  className={classnames("button is-primary is-danger", {
                    'is-loading': isReviewable === false
                  })}
                  onClick={this.handleSaveTrending({ isReviewable: false })}
                  type="button"
                >
                  Not reviewable
                </button>
              </nav>
            </article>
          </div>
      )}
      </Transition>
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
