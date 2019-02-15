import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import Avatar from '../../layout/Avatar'
import Extract from '../../layout/Extract'
import Rating from '../../layout/Rating'
import Tag from '../../layout/Tag'
import {
  selectArticleById,
  selectEvaluationById,
  selectTagsByReviewId,
  selectUserById,
} from '../../../selectors'

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
              <Avatar user={user} />
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

function mapStateToProps(state, ownProps) {
  const { review } =  ownProps
  const { articleId, id, evaluationId, userId } = review

  return {
    article: selectArticleById(state, articleId),
    evaluation: selectEvaluationById(state, evaluationId),
    tags: selectTagsByReviewId(state, id),
    user: selectUserById(state, userId),
  }
}

export default connect(mapStateToProps)(ReviewItem)
