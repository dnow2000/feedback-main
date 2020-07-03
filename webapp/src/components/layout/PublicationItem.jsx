import React from 'react'


import Icon from 'components/layout/Icon'


export default ({ publication }) => {
  const {
    author_list,
    doi,
    is_valid,
    journal_name,
    publication_year,
    title,
    url
  } = publication || {}


  return (
    <div className="publication-item">
      <Icon
        name={is_valid ? 'tick.png' : 'cross.png'}
      />
      <h3 className="publication-header">
        {title}
      </h3>
      <p className="publication-info">{journal_name} ({publication_year})</p>
      <ul className="publication-authors">
        {(author_list || []).map(authorName => (
          <li key={authorName}>
            {authorName}
          </li>
        ))}
      </ul>
      <p className="publication-doi">
        DOI: <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          >
            {doi}
          </a>
      </p>
    </div>
  )
}
