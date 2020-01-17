import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'

import { trendingThemes } from './utils'


const Themes = ({
  onChange,
  selectedTheme='all'
}) => {

  const handleOnChange = useCallback(value => () =>
    onChange('theme', value)
  , [onChange])

  return (
    <div className="themes">
      {trendingThemes.map(({ label, value }) => (
        <button
          className={classnames({ selected: selectedTheme !== value, thin: true})}
          key={value}
          onClick={handleOnChange(value)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  )
}

Themes.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string
}

export default Themes
