import React from 'react'

import ControlsContainer from './Controls/ControlsContainer'
import ItemsContainer from './Items/ItemsContainer'

const Feeds = ({ config, renderItem }) => (
  <>
    <ControlsContainer config={config} />
    <ItemsContainer
      config={config}
      renderItem={renderItem}
    />
  </>
)

export default Feeds
