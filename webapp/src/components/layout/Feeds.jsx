import PropTypes from 'prop-types'
import React, { useCallback } from 'react'

import Controls from './Controls'
import Days from './Days'
import Items from './Items'
import KeywordsBar from './KeywordsBar'
import Selector from './Selector'
import Themes from './Themes'


export const typeOptions = [
  { label: 'Claim', value: 'claim' },
  { label: 'Content', value: 'content' }
]


const _ = ({ config, renderItem }) => {
  const renderControls = useCallback(({handleChange, locationURL}) => (
    <>
      <KeywordsBar
        onChange={handleChange}
        selectedKeywords={locationURL.searchParams.get('keywords')}
      />
      <div className="search-spacing" />
      <div className="controls">
        <Themes
          onChange={handleChange}
          selectedTheme={locationURL.searchParams.get('theme')}
        />
        <div className="right">
          <Selector
            onChange={handleChange}
            option={typeOptions}
            searchKey='type'
            selectedValue={locationURL.searchParams.get('type') || 'article'}
          />
          <Days
            onChange={handleChange}
            selectedDays={locationURL.searchParams.get('days')}
          />
        </div>
      </div>
    </>
  ), [])
  return (
    <>
      <Controls
        config={config}
        render={renderControls}
      />
      <Items
        config={config}
        renderItem={renderItem}
      />
    </>
  )
}


_.propTypes = {
  config: PropTypes.shape({
    apiPath: PropTypes.string
  }).isRequired,
  renderItem: PropTypes.func.isRequired
}

export default _
