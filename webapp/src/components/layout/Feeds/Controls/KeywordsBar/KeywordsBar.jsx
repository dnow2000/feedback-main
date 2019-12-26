import React, { useCallback, useMemo } from 'react'
import { Form } from 'react-final-form'

import Icon from 'components/layout/Icon'
import TextField from 'components/layout/form/fields/TextField'


const KeywordsBar = ({
  keywords,
  onChange,
}) => {

  const initialValues = useMemo(() => ({ keywords }), [keywords])

  const handleKeywordsSubmit = useCallback(values => {
    const { keywords } = values
    onChange('keywords', keywords)
  }, [onChange])


  const renderInner = useCallback(() => (
    <button type="submit">
      <Icon name="loupe" />
    </button>
  ))

  return (
    <Form
      initialValues={initialValues}
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
