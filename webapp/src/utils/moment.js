import moment from 'moment'

export const getFormatPublishedDate = publishedDate =>
  publishedDate
    ? moment(publishedDate).format('D MMM YYYY')
    : "undated"
