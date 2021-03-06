import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { ROOT_PATH } from 'utils/config'


export default () => {
  const { pathname, search } = useLocation()
  return useMemo(() =>
    new URL(`${ROOT_PATH}${pathname}${search}`), [pathname, search])
}
