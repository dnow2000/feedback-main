import React, { useCallback } from 'react'
import { Form } from 'react-final-form'

import Icon from 'components/layout/Icon'
import TextField from 'components/layout/form/fields/TextField'

import { deleteData } from 'redux-thunk-data'


const KeywordsBar = ({
  dispatch,
  history: { push },
  query: { getSearchFromUpdate, getParams }
}) => {
  const queryParams = getParams()
  const handleKeywordsSubmit = useCallback(values => {
    const { keywords } = values

    const isEmptyKeywords =
      typeof keywords === 'undefined' ||
      keywords === ''

    if (!isEmptyKeywords) {
      dispatch(deleteData(null, { tags: '/articles-items'}))
    }

    push(getSearchFromUpdate({
      keywords: isEmptyKeywords ? null : keywords,
    }))
  }, [dispatch, getSearchFromUpdate, push])


  const renderInner = useCallback(() => (
    <button type="submit">
      <Icon name="loupe" />
    </button>
  ))

  return (
    <Form
      initialValues={queryParams}
      onSubmit={handleKeywordsSubmit}
      render={({ handleSubmit }) => (
        <form
          className="keywords-bar"
          onSubmit={handleSubmit}
        >
          <TextField
            name="keywords"
            placeholder="Type your search"
            renderInner={renderInner}
          />
        </form>
      )}
    />
  )
}

export default KeywordsBar
