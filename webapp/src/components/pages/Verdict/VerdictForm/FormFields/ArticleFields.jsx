import PropTypes from 'prop-types'
import React, { useCallback } from 'react'


import TextareaField from 'components/layout/form/fields/TextareaField'
import TextField from 'components/layout/form/fields/TextField'


const ArticleFields = () => {

  return (
    <div>
      <TextField
        label="url"
        name="articleUrl"
        required
      />
      <TextField
        label="title"
        name="articleTitle"
        required
      />
      <TextareaField
        label="summary"
        name="articleSummary"
        required
        rows={5}
      />
    </div>
  )
}


ArticleFields.propTypes = {
  form: PropTypes.shape({
    isModifiedEntity: PropTypes.bool,
    readOnly: PropTypes.bool,
  }).isRequired,
}

export default ArticleFields
