import PropTypes from 'prop-types'
import React from 'react'

import AvatarContainer from 'components/layout/Avatar/AvatarContainer'
import Extract from 'components/layout/Extract'
import Rating from 'components/layout/Rating'
import Tag from 'components/layout/Tag'

const ReviewItem = ({ review, tags, user }) => {
  const { comment, id, rating } = review
  const {
    id: userId,
    publicName,
  } = (user || {})

  return (
    <article className="review-item box columns is-vcentered">
      <div className="content p24">
        <div className="flex-columns items-center">
          <a
            className="anchor flex-columns items-center mr12"
            href={`/users/${userId}`}
            id='see-user'
          >
            <div className='mr12'>
              <AvatarContainer user={user} />
            </div>
            <div className="mr12">
              {publicName}
            </div>
          </a>
          <div className="col-25">
            {tags && tags.map(({ id: tagId, text }) =>
              <Tag key={tagId} theme={text} />)}
          </div>
          <a
            className='anchor'
            href={`/reviews/${id}`}
            id='see-review'
          >
            <Extract text={comment} />
          </a>
          <div className="flex-auto" />
          <Rating value={rating} />
        </div>
      </div>
    </article>
  )
}



ReviewItem.defaultProps = {
  review: null,
  tags: null,
  user: null,
}

ReviewItem.propTypes = {
  review: PropTypes.object,
  tags: PropTypes.array,
  user: PropTypes.object,
}

export default ReviewItem
