import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'
import withQueryRouter from 'with-query-router'

import VerdictItem from './VerdictItem'
import { withRedirectToSigninWhenNotAuthenticated} from '../../hocs'
import Main from '../../layout/Main'
import Header from '../../layout/Header'
import { selectVerdictsByArticleId } from '../../../selectors'
import { verdictNormalizer } from '../../../utils/normalizers'

class Verdicts extends Component {

  componentDidMount() {
    const { query } = this.props
    const queryParams = query.parse()
    if (!queryParams.page) {
      this.handleRequestData()
    }
  }

  handleRequestData = (handleSuccess, handleFail) => {
    const { dispatch, query } = this.props
    const queryParams = query.parse()
    const { articleId } = queryParams

    let apiPath = '/verdicts'
    if (articleId) {
      apiPath = `${apiPath}?articleId=${articleId}`
    }

    dispatch(requestData({
      apiPath,
      handleFail,
      handleSuccess,
      normalizer: verdictNormalizer
    }))
  }

  render () {
    const {
      verdicts
    } = this.props
    return (
      <Fragment>
        <Header />
        <Main name='home'>
          <section className='section hero'>
            <h1 className='main-title'>
              VERDICTS
            </h1>
          </section>

          <section className="section">
            {
              verdicts.map(verdict =>
                <VerdictItem key={verdict.id} verdict={verdict} />)
            }
          </section>
        </Main>
      </Fragment>
    )
  }
}

Verdicts.defaultProps = {
  verdicts: null
}

Verdicts.propTypes = {
  dispatch: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  verdicts: PropTypes.array
}

function mapStateToProps (state, ownProps) {
  const { query } = ownProps
  const queryParams = query.parse()
  const { articleId } = queryParams
  return {
    verdicts: articleId
      ? selectVerdictsByArticleId(state, articleId)
      : state.data.verdicts
  }
}

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  withQueryRouter(),
  connect(mapStateToProps)
)(Verdicts)
