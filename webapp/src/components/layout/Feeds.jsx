import React from 'react'

import Controls from './Controls'
import Days from './Days'
import Items from './Items'
import KeywordsBar from './KeywordsBar'
import Themes from './Themes'
import Types from './Types'


export default ({ config, renderItem }) => (
  <>
    <Controls
      config={config}
      render={({handleChange, locationURL}) => (
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
              <Types
                onChange={handleChange}
                selectedType={locationURL.searchParams.get('type')}
              />
              <Days
                onChange={handleChange}
                selectedDays={locationURL.searchParams.get('days')}
              />
            </div>
          </div>
        </>
      )}
    />
    <Items
      config={config}
      renderItem={renderItem}
    />
  </>
)
