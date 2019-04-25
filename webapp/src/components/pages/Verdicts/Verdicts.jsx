import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { requestData } from 'redux-saga-data'

import VerdictItemContainer from './VerdictItem/VerdictItemContainer'
import Main from '../../layout/Main'
import Header from '../../layout/Header'
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
                <VerdictItemContainer key={verdict.id} verdict={verdict} />)
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

export default Verdicts
