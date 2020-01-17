import PropTypes from 'prop-types'
import React, { useCallback } from 'react'


import TextareaField from 'components/layout/form/fields/TextareaField'
import TextField from 'components/layout/form/fields/TextField'


const ArticleFields = () => {
  const renderValue = useCallback(() => (
    <button
      className="button is-transparent"
      type="button"
    />
  ))
  return (
    <div className="field-group">
      <TextField
        label="url"
        name="articleUrl"
        renderValue={renderValue}
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
      <div className="optional-subtitle">
        {"Optional:"}
      </div>
      <div className="flex-columns flex-wrap">
        <TextField
          className='pr12'
          label="Total shares"
          name="totalShares"
          type="number"
        />
        <TextField
          className='pr12'
          label="Facebook shares"
          name="fbShares"
          type="number"
        />
        <TextField
          label="Twitter shares"
          name="twitterShares"
          type="number"
        />
      </div>
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
