import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'

const _ = ({
  isAtTop,
  onChange,
  selectedKeywords,
  layout = 'horizontal'
}) => {
  const inputRef = useRef()
  const [value, setValue] = useState(selectedKeywords)

  const handleKeywordsClick = useCallback(() =>
    onChange('keywords', value), [onChange, value])

  const handlePressEnter = useCallback(event => {
    if (event.keyCode === 13) {
      event.preventDefault()
      handleKeywordsClick()
    }
  }, [handleKeywordsClick])

  const handleKeywordsInputChange = useCallback(event => setValue(event.target.value), [])


  useEffect(() => {
    const inputElement = inputRef.current
    inputElement.addEventListener("keyup", handlePressEnter)
    return () => inputElement.removeEventListener("keyup", handlePressEnter)
  }, [handlePressEnter])


  return (
    <div className={classnames(`keywords-bar ${layout}`, { 'is-docked': !isAtTop })}>
      <input
        className="keywords-input"
        defaultValue={value}
        name="keywords"
        onChange={handleKeywordsInputChange}
        placeholder="Type your search"
        ref={inputRef}
      />
      <button
        onClick={handleKeywordsClick}
        type="button"
      >
        {'Search'}
      </button>
    </div>
  )
}

_.defaultProps = {
  isAtTop: true,
  layout: 'horizontal',
  selectedKeywords: ''
}

_.propTypes = {
  isAtTop: PropTypes.bool,
  layout: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  selectedKeywords: PropTypes.string
}

export default _
