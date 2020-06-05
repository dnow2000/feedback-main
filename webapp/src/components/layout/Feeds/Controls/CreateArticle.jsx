import React, { useCallback } from 'react'

export default ({
  formidable: { creationUrl }
  history: { push }
}) => {

  const handleCreateArticle = useCallback(() => {
    push(creationUrl)
  }, [creationUrl, push])


  return (
    <button
      className="create-article"
      id="create-article"
      onClick={handleCreateArticle}
      type="button"
    >
      New article
    </button>
  )
}
