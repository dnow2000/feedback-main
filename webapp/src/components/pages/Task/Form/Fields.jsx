import React from 'react'
import { useSelector } from 'react-redux'

import SelectField from 'components/layout/form/fields/TexteditorField'


export default () => {
  const taskTypes = useSelector(state => state.data.taskTypes)

  return (
    <div className="fields">
      <SelectField
        name="type"
        options={taskTypes}
        required
      />
    </div>
  )
}
