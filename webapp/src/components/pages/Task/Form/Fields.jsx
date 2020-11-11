import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { useFormidable } from 'with-react-formidable'


import SelectField from 'components/layout/form/fields/SelectField'


export default () => {
  const location = useLocation()
  const params = useParams()
  const {
    readOnly
  } = useFormidable(location, params)
  const taskNameOptions = useSelector(state =>
    state.data.taskNameOptions)




  return (
    <div className="fields">
      <SelectField
        label="name"
        name="name"
        options={taskNameOptions}
        readOnly={readOnly}
        required
      />
    </div>
  )
}
