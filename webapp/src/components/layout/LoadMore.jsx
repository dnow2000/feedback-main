import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const _ = ({
  visible,
  items,
  renderItem,
  loadMoreText,
  loadLessText,
  Button
}) => {
  const [currentVisible, setVisible] = useState(visible)
  const [buttonText, setButtonText] = useState(loadMoreText)

  const loadMore = useCallback(() => {
    if (currentVisible < items.length) {
      setVisible(currentVisible + visible)
    } else {
      if (buttonText === loadLessText) {
        setVisible(visible)
        setButtonText(loadMoreText)
        return
      }
      setVisible(items.length)
      setButtonText(loadLessText)
    }
  }, [currentVisible, buttonText, loadLessText, loadMoreText, items.length, visible])


  return(
    <>
      { items.slice(0, currentVisible).map(item => renderItem(item)) }
      { items.length > visible && (
        <Button
          onClick={loadMore}
          text={buttonText}
        />
      ) }
    </>
  )
}

_.defaultProps = {
  items: [],
  loadLessText: 'Load less',
  loadMoreText: 'Load more',
  visible: 4
}

_.propTypes = {
  Button: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.any),
  loadLessText: PropTypes.string,
  loadMoreText: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
  visible: PropTypes.number
}

export default _
