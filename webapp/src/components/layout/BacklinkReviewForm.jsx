import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Form } from 'react-final-form'
import { requestData } from 'redux-thunk-data'

import RadiosField from 'components/layout/form/fields/RadiosField'
import TextareaField from 'components/layout/form/fields/TextareaField'

export default ({ quotingContent }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const { verdictId } = params
  const { isPending } = useSelector(state => state.requests[`/verdicts/${verdictId}/appearances`])

  const handleSubmit = useCallback(formValues => {
    const body = { ...formValues, quotingContent }

    dispatch(requestData({
      apiPath: `/verdicts/${verdictId}/appearances`,
      body: body,
      isMergingDatum: true,
      method: 'post'
    }))
  }, [dispatch, verdictId])

  const flags = ['True', 'False', 'Partly false', 'False headline', 'Misleading', 'Missing context']
  const options = Object.keys(flags).map(key => {
    return {id: key, label: flags[key], title: flags[key], value: flags[key]}
  })

  const renderForm = useCallback(formProps => {
    const { handleSubmit } = formProps

    return (
      <form
        autoComplete="off"
        className="form"
        disabled={isPending}
        noValidate
        onSubmit={handleSubmit}
      >
        <RadiosField
          name='appearance[facebookFlag]'
          options={options}
        />
        <TextareaField
          name='appearance[facebookFlagComment]'
          placeholder='Please explain your choice of rating.'
        />
        <button
          className='backlink-submit-button'
          type='submit'
        >
          {'Submit'}
        </button>
      </form>
    )
  }, [isPending, options])

  return (
    <div className='backlink-container'>
      <div className='backlink-form'>
        <Form
          onSubmit={handleSubmit}
          render={renderForm}
        />
      </div>
    </div>
  )
}
