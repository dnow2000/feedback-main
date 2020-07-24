import { getStateKeyFromConfig } from 'fetch-normalize-data'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { deleteData } from 'redux-thunk-data'

import useLocationURL from 'components/uses/useLocationURL'


export const getItemsActivityTagFromConfig = config =>
  `/${getStateKeyFromConfig(config)}-items`


const _ = ({ config, pathnameOnChange, render }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { search } = useLocation()
  const locationURL = useLocationURL()


  const handleChange =  useCallback((key, value) => {
    const isEmptyValue = typeof value === 'undefined' || value === ''
    if (isEmptyValue) {
      locationURL.searchParams.delete(key)
    } else {
      locationURL.searchParams.set(key, value)
    }
    if (locationURL.search === search) return
    dispatch(deleteData(null, { tags: [getItemsActivityTagFromConfig(config)] }))
    setTimeout(() => history.push(`${pathnameOnChange || locationURL.pathname}${locationURL.search}`))
  }, [config, dispatch, history, locationURL, pathnameOnChange, search])


  return render({handleChange, locationURL})
}


_.defaultProps = {
  pathnameOnChange: null
}


_.propTypes = {
  config: PropTypes.shape().isRequired,
  pathnameOnChange: PropTypes.string,
  render: PropTypes.func.isRequired,
}


export default _
