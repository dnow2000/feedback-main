import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { requestData } from 'redux-thunk-data'

import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import ItemsContainer from 'components/layout/Items/ItemsContainer'
import VerdictItemContainer from 'components/layout/VerdictItem/VerdictItemContainer'
import { verdictNormalizer } from 'utils/normalizers'

class Verdicts extends PureComponent {

  componentDidMount() {
    const { query } = this.props
    const queryParams = query.getParams()
    if (!queryParams.page) {
      this.handleRequestData()
    }
  }

  handleRequestData = (handleSuccess, handleFail) => {
    const { dispatch, query } = this.props
    const queryParams = query.getParams()
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
          <div className="container">
            <section className='hero'>
              <h1 className='title'>
                VERDICTS
              </h1>
            </section>

            <section>
              <ItemsContainer
                hasMore={false}
                isLoading={false}
                items={verdicts}
                renderItem={item => <VerdictItemContainer verdict={item} />}
              />
            </section>
          </div>
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
