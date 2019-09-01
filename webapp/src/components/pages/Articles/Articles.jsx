import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { Form } from 'react-final-form'
import LoadingInfiniteScroll from 'react-loading-infinite-scroller'
import { assignData, requestData } from 'redux-saga-data'

import ArticleItemContainer from './ArticleItem/ArticleItemContainer'
import HeaderContainer from '../../layout/Header/HeaderContainer'
import MainContainer from '../../layout/Main/MainContainer'
import { TextField } from '../../layout/form/fields'
import { articleNormalizer } from '../../../utils/normalizers'

class Articles extends PureComponent {
  constructor (props) {
    super(props)
    const { dispatch } = props

    this.state = {
      hasMore: false,
      isLoading: false
    }

    dispatch(assignData({ articles: [] }))
  }

  componentDidMount() {
    this.handleRequestData()
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

    const apiPath = `/articles${search}`

    this.setState({ isLoading: true })

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
        normalizer: articleNormalizer,
      })
    )
  }

  onKeywordsSubmit = values => {
    const { dispatch, query } = this.props
    const { keywords } = values

    const isEmptyKeywords =
      typeof keywords === 'undefined' ||
      keywords === ''

    if (!isEmptyKeywords) {
      dispatch(assignData({ articles: [] }))
    }

    query.change(
      {
        keywords: isEmptyKeywords ? null : keywords,
        page: null,
      }
    )
  }

  onReviewableClick = reviewable => () => {
    const { dispatch, query } = this.props
    const queryParams = query.parse()

    dispatch(assignData({ articles: [] }))

    const nextReviewable = queryParams.reviewable === reviewable
      ? null
      : reviewable

    query.change(
      {
        page: null,
        reviewable: nextReviewable,
      }
    )

  }

  render() {
    const { articles, canCreateArticle, query } = this.props
    const queryParams = query.parse()
    const { reviewable } = queryParams
    const { hasMore, isLoading } = this.state

    return (
      <Fragment>
        <HeaderContainer />
        <MainContainer name="articles">
          <section className="section hero is-relative">
            <h1 className="title">
              Articles
            </h1>
            <div className="control">

              {['true', 'false'].map(boolString => (
                <button
                  className={classnames("button is-secondary",
                    {
                      "is-inversed": reviewable !== boolString
                    })}
                  key={boolString}
                  onClick={this.onReviewableClick(boolString)}
                  type="button"
                >
                  {boolString === 'false' && "Not "}reviewable
                </button>
              ))}

              {canCreateArticle && (
                <button
                  className="button is-primary"
                  id="create-article"
                  onClick={() => query.changeToCreation()}
                  type="button"
                >
                  New article
                </button>
              )}
            </div>
          </section>

          <section>
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
              hasMore={hasMore}
              isLoading={isLoading}
              useWindow
            >
              {
                articles.map(article => (
                  <div className="mb16" key={article.id}>
                    <ArticleItemContainer article={article} />
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

Articles.defaultProps = {
  articles: null,
  canCreateArticle: false,
}

Articles.propTypes = {
  articles: PropTypes.array,
  canCreateArticle: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired
}

export default Articles
