import classnames from 'classnames'
import React, { useCallback, useState } from 'react'


import Icon from 'components/layout/Icon'


export default ({children}) => {
  const [ctasVisible, setCtasVisible] = useState(false)


  const handleClick = useCallback(() => {
    setCtasVisible(ctasVisible => !ctasVisible)
  }, [setCtasVisible])


  return (
    <button
      className="ctas"
      onClick={handleClick}
    >
      <Icon name='ico-down-arrow.svg' />
      <div className={classnames('ctas-container',
        { 'is-visible': ctasVisible })}
      >
        {children}
      </div>
    </button>
  )
}
