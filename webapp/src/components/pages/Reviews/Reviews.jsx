import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'

import Feeds from 'components/layout/Feeds/Feeds'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import ReviewItemContainer from 'components/layout/ReviewItem/ReviewItemContainer'

const Reviews = ({
  location: { search }
}) => {
  const config = useMemo(() => ({
    apiPath: `/reviews${search}`
  }), [search])


  const renderItem = useCallback(item =>
    <ReviewItemContainer article={item} />, [])


  return (
    <>
      <HeaderContainer />
      <MainContainer name="reviews">
        <div className="container">
          <section>
            <Feeds
              config={config}
              key={search}
              renderItem={renderItem}
            />
          </section>
        </div>
      </MainContainer>
    </>
  )
}

Reviews.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
}

export default Reviews
