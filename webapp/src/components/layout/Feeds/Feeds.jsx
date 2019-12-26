import React from 'react'

import ControlsContainer from './Controls/ControlsContainer'
import ItemsContainer from './Items/ItemsContainer'

const Feeds = ({ config, renderItem }) => (
  <>
    <ControlsContainer />
    <br />
    <ItemsContainer
      config={config}
      renderItem={renderItem}
    />
  </>
)

export default Feeds
