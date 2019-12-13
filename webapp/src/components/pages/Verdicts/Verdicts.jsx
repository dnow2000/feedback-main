import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { requestData } from 'redux-thunk-data'

import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import VerdictItemContainer from 'components/layout/VerdictItem/VerdictItemContainer'
import { verdictNormalizer } from 'utils/normalizers'

class Verdicts extends PureComponent {

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
      <>
        <HeaderContainer />
        <MainContainer name='verdicts'>
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
        </MainContainer>
      </>
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
