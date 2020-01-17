import PropTypes from 'prop-types'
import React, { useCallback, useMemo, input } from 'react'
import { Form } from 'react-final-form'

import Icon from 'components/layout/Icon'

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

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleKeywordsSubmit}
      render={({ handleSubmit }) => (
        <form
          className="keywords-bar"
          onSubmit={handleSubmit}
        >
          <input
            {...input}
            className="keywords-input"
            name="keywords"
            placeholder="Type your search"
          />
          <button
            className="is-inner-input"
            type="submit"
          >
            <Icon className="icon" name="loupe.svg" />
          </button>
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
