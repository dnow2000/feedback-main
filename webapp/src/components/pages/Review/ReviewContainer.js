import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-thunk-data'
import { selectCurrentUser } from 'with-react-redux-login'
import withForm from 'with-react-form'
import withQuery from 'with-react-query'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'
import selectArticleIdByMatchAndQuery from 'selectors/selectArticleIdByMatchAndQuery'
import selectArticleById from 'selectors/selectArticleById'
import parseSubmitErrors from 'utils/form/parseSubmitErrors'
import { articleNormalizer, reviewNormalizer } from 'utils/normalizers'

import Review from './Review'
import selectFormInitialValuesByArticleId from './selectors/selectFormInitialValuesByArticleId'
import selectVerdictsByArticleIdAndByUserId from './selectors/selectVerdictsByArticleIdAndByUserId'


const mapStateToProps = (state, ownProps) =>  {
  const articleId = selectArticleIdByMatchAndQuery(
    state,
    ownProps.match,
    ownProps.query
  )

  const formInitialValues = selectFormInitialValuesByArticleId(state, articleId)
  const currentUser = selectCurrentUser(state)
  const { id: userId } = (currentUser || {})

  const { isPending } = state.requests['/reviews'] || {}

  return {
    article: selectArticleById(state, articleId),
    formInitialValues,
    isPending,
    verdicts: selectVerdictsByArticleIdAndByUserId(state, articleId, userId)
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  const { form, match, query } = ownProps
  const { params: { reviewId } } = match
  const { articleId } = query.getParams()
  const { isCreatedEntity } = form
  return {
    requestGetData: () => {
      dispatch(requestData({ apiPath: '/evaluations' }))

      dispatch(requestData({ apiPath: '/tags?scopes=review' }))

      if (!isCreatedEntity) {
        dispatch(
          requestData({
            apiPath: `/reviews/${reviewId}`,
            normalizer: reviewNormalizer,
          })
        )
        return
      }

      if (!articleId) {
        return
      }

      dispatch(
        requestData({
          apiPath: `/articles/${articleId}`,
          normalizer: articleNormalizer,
        })
      )
    },

    requestSubmitReview: ({ formValues, modifiedReviewId }) => {
      const { form, history } = ownProps
      const { method } = form

      const apiPath = `/reviews/${modifiedReviewId || ''}`

      return new Promise(resolve => {
        dispatch(requestData({
          activityTag: '/reviews',
          apiPath,
          body: { ...formValues },
          handleFail: (state, action) => {
            const { payload } = action
            const errors = parseSubmitErrors(payload.errors)
            resolve(errors)
          },
          handleSuccess: (state, action) => {
            const { payload: { datum } } = action
            const createdReviewId = datum.id
            resolve()
            const nextUrl = `/reviews/${createdReviewId}`
            history.push(nextUrl)
          },
          method
        }))
      })
    }
  }
}

export default compose(
  withRouter,
  withQuery(),
  withRequiredLogin,
  withForm,
  withRoles({ creationRoleTypes: ['reviewer'], modificationRoleTypes: ['reviewer'] }),
  connect(mapStateToProps, mapDispatchToProps)
)(Review)
