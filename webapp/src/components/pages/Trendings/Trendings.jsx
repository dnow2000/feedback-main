import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import LoadingInfiniteScroll from 'react-loading-infinite-scroller'
import { assignData, requestData } from 'redux-thunk-data'

import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'

import TrendingItemContainer from './TrendingItem/TrendingItemContainer'
import { trendingMaxDates, trendingThemes } from './utils'

class Trendings extends PureComponent {
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
    const { history, query } = this.props
    const queryParams = query.getParams()
    const { theme, page } = queryParams
    if (!theme) {
      history.push(query.getSearchFromUpdate({ theme: "all" }))
    }
    if (!page) {
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
    const { dispatch, history, query } = this.props
    const queryParams = query.getParams()

    let nextValue = value

    if (value === 1) {
      if (!queryParams.days) {
        return
      }
      nextValue = null
    }

    dispatch(assignData({ trendings: [] }))
    history.push(query.getSearchFromUpdate({
      [key]: nextValue,
      page: null
    }))
  }

  render() {
    const { query, trendings } = this.props
    const queryParams = query.getParams()
    const { days, theme } = queryParams
    const { hasMore, isLoading } = this.state

    return (
      <Fragment>
        <HeaderContainer />
        <MainContainer name="trendings">
          <section className="section hero">
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
                    <TrendingItemContainer trending={trending} />
                  </div>
                ))
              }
            </LoadingInfiniteScroll>
          </section>
        </MainContainer>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  query: PropTypes.shape({
    getParams: PropTypes.func.isRequired,
    getSearchFromUpdate: PropTypes.func.isRequired
  }).isRequired,
  trendings: PropTypes.array
}

export default Trendings
