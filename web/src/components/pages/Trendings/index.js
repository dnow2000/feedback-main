import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import LoadingInfiniteScroll from 'react-loading-infinite-scroller'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { assignData, requestData } from 'redux-saga-data'
import withQueryRouter from 'with-query-router'

import TrendingItem from './TrendingItem'
import { trendingMaxDates, trendingThemes } from './utils'
import { withRedirectToSigninWhenNotAuthenticated, withRoles } from '../../hocs/'
import Header from '../../layout/Header'
import Main from '../../layout/Main'
import { selectTrendings } from '../../../selectors'

class Trendings extends Component {
  constructor (props) {
    super(props)

    const { dispatch } = props

    this.state = {
      hasMore: false,
      isLoading: false
    }

    dispatch(assignData({ trendings: [] }))
  }

  componentDidMount() {
    const { query } = this.props
    const queryParams = query.parse()
    if (!queryParams.page) {
      this.handleRequestData()
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props
    if (location.search !== prevProps.location.search) {
      this.handleRequestData()
    }
  }

  handleRequestData = () => {
    const { dispatch, location } = this.props
    const { search } = location

    const apiPath = `/trendings${search}`

    this.setState({ isLoading: true }, () => {
      dispatch(
        requestData({
          apiPath,
          getDatumIdValue: datum => datum.buzzsumoId,
          handleFail: () => {
            this.setState({
              hasMore: false,
              isLoading: false
            })
          },
          handleSuccess: (state, action) => {
            const { payload: { data } } = action
            this.setState({
              hasMore: data && data.length > 0,
              isLoading: false
            })
          }
        })
      )
    })
  }

  handleRequestDataWithQuery = (key, value) => () => {
    const { dispatch, query } = this.props
    const queryParams = query.parse()

    let nextValue = value

    if (value === 1) {
      if (!queryParams.days) {
        return
      }
      nextValue = null
    }

    dispatch(assignData({ trendings: [] }))
    query.change({
      [key]: nextValue,
      page: null
    })
  }

  render() {
    const { query, trendings } = this.props
    const queryParams = query.parse()
    const { days, theme } = queryParams
    const { hasMore, isLoading } = this.state

    return (
      <Fragment>
        <Header />
        <Main name="trendings">
          <section className="section hero">
            <h1 className="title">
              Trendings
            </h1>
            <div className="flex-columns items-center mb12">
              <div>
                {trendingThemes.map(({ label, value }) => (
                  <button
                    className={classnames("button is-primary", {
                      "is-outlined": theme !== value,
                    })}
                    key={value}
                    onClick={this.handleRequestDataWithQuery('theme', value)}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex-auto" />

              <div>
                {trendingMaxDates.map(({ label, value }) => (
                  <button
                    className={classnames("button is-secondary", {
                      "is-inversed": (days || '1') !== String(value),
                    })}
                    key={value}
                    onClick={this.handleRequestDataWithQuery('days', value)}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>

            </div>
          </section>

          <section>
            <LoadingInfiniteScroll
              hasMore={hasMore}
              isLoading={isLoading}
              useWindow
            >
              {
                trendings.map(trending => (
                  <div className="mb16" key={trending.id}>
                    <TrendingItem trending={trending} />
                  </div>
                ))
              }
            </LoadingInfiniteScroll>
          </section>
        </Main>
      </Fragment>
    )
  }
}

Trendings.defaultProps = {
  trendings: null,
}

Trendings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  trendings: PropTypes.array
}

function mapStateToProps(state) {
  return {
    trendings: selectTrendings(state)
  }
}

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  withRoles({ accessRoleTypes: ['editor'] }),
  withQueryRouter(),
  connect(mapStateToProps)
)(Trendings)
