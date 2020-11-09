import React, { useCallback } from 'react'
import { Form as ReactFinalForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'
import { closeModal, showModal } from 'redux-react-modals'


export default () => {
  const { verdictId } = useParams()

  const verdict =  useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))
  const { claimId } = verdict || {}

  const claim = useSelector(state =>
    selectEntityByKeyAndId(state, 'claims', claimId))
  const { id: quotedClaimId } = claim || {}


  const initialValues = useMemo(() => ({
    quotedClaimId
  }), [quotedClaimId])

  const handleFormSubmit = useCallback(formValues =>
    new Promise(resolve =>
      dispatch(requestData({
        apiPath: '/links',
        body: formValues,
        handleFail: (beforeState, action) =>
          resolve(requests(beforeState.requests, action)['/links'].errors),
        handleSuccess: () => {
          resolve()
          dispatch(closeModal('main'))
          history.push(`/verdicts/${verdictId}/links`)
        },
        method: 'POST'
      }))), [dispatch, history, verdictId])

  useEffect(() => {
    if (linkId === 'creation') {
      dispatch(showModal(
        'main',
        <ReactFinalForm
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          render={Form}
        />, { isUnclosable: true }))
        return
    }
  }, [dispatch, handleFormSubmit, initialValues, linkId])

  return (
    <NavLink
      className="add"
      type="button"
      to={`/verdicts/${verdictId}/links/creation`}
    >
      + Add a new link
    </NavLink>*
  )
}
