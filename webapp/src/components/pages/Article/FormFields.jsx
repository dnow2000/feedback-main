import classnames from 'classnames'
import React, { useCallback } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useFormidable } from 'with-react-formidable'

import TextareaField from 'components/layout/form/fields/TextareaField'
import TextField from 'components/layout/form/fields/TextField'
import { getScrap } from 'utils/scrap'


const validateScrapField = async value => {
  const scrap = await getScrap(value)
  if (!scrap.error) return undefined
  return scrap.error
}


export default ({ validating }) => {
  const location = useLocation()
  const params = useParams()
  const { isModifiedEntity, readOnly } = useFormidable(location, params)

  const renderLoadingSpinner = useCallback(() => (
    <button
      className={classnames("scrap", {
        "is-seethrough": !validating
      })}
      type="button"
    />
  ), [validating])

  return (
    <>
      <TextField
        label="url"
        name="url"
        readOnly={readOnly || isModifiedEntity}
        renderValue={renderLoadingSpinner}
        required
        validate={validateScrapField}
      />
      <TextField
        label="title"
        name="title"
        readOnly={readOnly}
        required
      />
      <TextareaField
        label="summary"
        name="summary"
        readOnly={readOnly}
        required
        rows={readOnly ? 1 : 5}
      />
    </>
  )
}
