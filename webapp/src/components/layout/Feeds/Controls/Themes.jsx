import classnames from 'classnames'
import React, { useCallback } from 'react'

import { trendingThemes } from './utils'


const Themes = ({
  onChange,
  theme
}) => (
  <div className="themes">
    {trendingThemes.map(({ label, value }) => (
      <button
        className={classnames("thin", { selected: theme !== value})}
        key={value}
        onClick={onChange('theme', value)}
        type="button"
      >
        {label}
      </button>
    ))}
  </div>
)

export default Themes
