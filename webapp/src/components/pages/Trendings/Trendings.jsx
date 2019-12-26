import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import LoadingInfiniteScroll from 'react-loading-infinite-scroller'
import { assignData, requestData } from 'redux-thunk-data'

import HeaderContainer from 'components/layout/Header/HeaderContainer'
import ItemsContainer from 'components/layout/Items/ItemsContainer'
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

    const apiPath =

    this.setState({ isLoading: true }, () => {
      dispatch(
        requestData({

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



  render() {
    const { location, query, trendings } = this.props
    const { search } = location
    const queryParams = query.getParams()
    const { theme } = queryParams
    const { hasMore, isLoading } = this.state

    return (
      <>
        <HeaderContainer />
        <MainContainer name="trendings">
          <div className="container">
            <section className="controls">


            
            </section>

            <section>
              <ItemsContainer
                config={{
                  apiPath: `/trendings${search}`,
                  getDatumIdValue: datum => datum.buzzsumoId,
                }}
                renderItem={item => <TrendingItemContainer trending={item} />}
              />
            </section>
          </div>
        </MainContainer>
      </>
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
  }).isRequired
}

export default Trendings
