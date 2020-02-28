import React from 'react'
import { useSelector } from 'react-redux'
import { selectEntityByKeyAndId } from 'redux-thunk-data'

import Avatar from 'components/layout/Avatar'
import Extract from 'components/layout/Extract'
import Rating from 'components/layout/Rating'
import Tag from 'components/layout/Tag'
import selectTagsByReviewId from 'selectors/selectTagsByReviewId'


export default ({ review }) => {
  const {
    comment,
    id: reviewId,
    rating,
    userId
  } = review


  const tags = useSelector(state => selectTagsByReviewId(state, reviewId))

  const user = useSelector(state =>
    selectEntityByKeyAndId(state, 'users', userId)) || {}
  const { publicName } = user


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
              <Avatar user={user} />
            </div>
            <div className="mr12">
              {publicName}
            </div>
          </a>
          <div className="col-25">
            {tags.map(({ id: tagId, text }) =>
              <Tag key={tagId} theme={text} />)}
          </div>
          <a
            className='anchor'
            href={`/reviews/${reviewId}`}
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
