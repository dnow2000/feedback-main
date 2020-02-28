import React from 'react'

import Controls from './Controls'
import Items from './Items'

const Feeds = ({ config, renderItem }) => (
  <>
    <Controls config={config} />
    <Items
      config={config}
      renderItem={renderItem}
    />
  </>
)

export default Feeds
