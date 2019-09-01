import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import LoadingInfiniteScroll from 'react-loading-infinite-scroller'
import { Form } from 'react-final-form'
import { assignData, requestData } from 'redux-saga-data'

import ReviewItemContainer from './ReviewItem/ReviewItemContainer'
import { TextField } from '../../../layout/form/fields'
import { itemReviewNormalizer } from '../../../../utils/normalizers'

function getScrollParent () {
  return document.querySelector('.modal-dialog')
}

class ReviewsExploration extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      hasMore: false,
      isLoading: false
    }
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

    const apiPath = `/reviews${search}`

    this.setState({ isLoading: true }, () => {
      dispatch(
        requestData({
          apiPath,
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
          },
          isMergingArray: true,
          isMergingDatum: true,
          normalizer: itemReviewNormalizer,
        })
      )
    })
  }

  onKeywordsSubmit = values => {
    const { currentReview, dispatch, query } = this.props
    const { keywords } = values

    const isEmptyKeywords =
      typeof keywords === 'undefined' ||
      keywords === ''

    if (!isEmptyKeywords) {
      dispatch(assignData({ reviews: currentReview ? [currentReview] : [] }))
    }

    query.change(
      {
        keywords: isEmptyKeywords ? null : keywords,
        page: null,
      }
    )
  }

  render() {
    const {
      isModal,
      query,
      reviews
    } = this.props
    const queryParams = query.parse()
    const { hasMore, isLoading } = this.state

    return (
      <Fragment>
        <Form
          initialValues={queryParams}
          onSubmit={this.onKeywordsSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                name="keywords"
                placeholder="Type your search"
                renderValue={
                  () => (
                    <button
                      className="button is-primary is-outlined search-ok"
                      type="submit"
                    >
                      OK
                    </button>
                  )
                }
              />
            </form>
          )}
        />

        <br />

        <LoadingInfiniteScroll
          getScrollParent={isModal ? getScrollParent : null}
          hasMore={hasMore}
          isLoading={isLoading}
          useWindow={!isModal}
        >
          {
            reviews.map(review => (
              <div className="mb16" key={review.id}>
                <ReviewItemContainer review={review} />
              </div>
            ))
          }
        </LoadingInfiniteScroll>
      </Fragment>
    )
  }
}

ReviewsExploration.defaultProps = {
  currentReview: null,
  isModal: false,
  reviews: null
}

ReviewsExploration.propTypes = {
  currentReview: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  isModal: PropTypes.bool,
  location: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  reviews: PropTypes.array,
}

export default ReviewsExploration
