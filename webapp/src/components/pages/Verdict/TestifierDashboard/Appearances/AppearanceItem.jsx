import React from 'react'


export default ({ appearance }) => {
  const { quotingContent } = appearance
  const { url } = quotingContent || {}

  const domain = url.replace(/https?:\/\//, '').split('/')[0]


  return (
    <div className="appearance-item">
      <span className="domain"> {domain} </span> <a
        className="link"
        href={url}>{url}</a>
    </div>
  )
}
