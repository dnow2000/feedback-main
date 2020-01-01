import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { Form } from 'react-final-form'

import Icon from 'components/layout/Icon'
import TextField from 'components/layout/form/fields/TextField'


const KeywordsBar = ({
  onChange,
  selectedKeywords
}) => {

  const initialValues = useMemo(() =>
    ({ keywords: selectedKeywords }), [selectedKeywords])

  const handleKeywordsSubmit = useCallback(values => {
    const { keywords } = values
    onChange('keywords', keywords)
  }, [onChange])


  const renderInner = useCallback(() => (
    <button type="submit">
      <Icon name="loupe" />
    </button>
  ), [])

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


KeywordsBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedKeywords: PropTypes.string
}

export default KeywordsBar
