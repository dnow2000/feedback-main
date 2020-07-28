import { useMemo } from 'react'

import timeAgo from 'utils/timeAgo'


export default date => useMemo(() => timeAgo(Date.parse(date)), [date])
