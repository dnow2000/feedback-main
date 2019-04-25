import { selectReviewsByArticleId } from '../../../../selectors'

function mapStateToProps(state, ownProps) {
  const { query } = ownProps
  const queryParams = query.parse()
  const { articleId } = queryParams
  return {
    reviews: selectReviewsByArticleId(state, articleId),
  }
}

export default mapStateToProps
