import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'

import Feeds from 'components/layout/Feeds/Items/ItemsContainer'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import VerdictItemContainer from 'components/layout/VerdictItem/VerdictItemContainer'
import { verdictNormalizer } from 'utils/normalizers'


const Verdicts = ({ location: { search } }) => {
  const config = useMemo(() => ({
    apiPath: `/verdicts${search}`,
    normalizer: verdictNormalizer
  }), [search])


  const renderItem = useCallback(item =>
    <VerdictItemContainer verdict={item} />, [])

  return (
    <>
      <Header />
      <Main name='verdicts'>
        <div className="container">
          <section className='hero'>
            <h1 className='title'>
              VERDICTS
            </h1>
          </section>

          <section>
            <Feeds
              config={config}
              renderItem={renderItem}
            />
          </section>
        </div>
      </Main>
    </>
  )
}


Verdicts.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
}

export default Verdicts
