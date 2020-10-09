import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect, useLocation } from 'react-router-dom'


const _ = ({ delay, redirect }) => {
  const { pathname } = useLocation()
  const [timing, setTiming] = useState(delay)


  useEffect(() => {
    const timeout = 1000
    const timer = setInterval(() => {
      setTiming(timing => timing - 1)
    }, timeout)

    return () => {
      clearInterval(timer)
    }
  }, [setTiming])


  if (timing < 0) return <Redirect to={redirect} />

  return (
    <div className="not-match">
      <h3 className="title">
        {`404 Not found ${pathname}`}
      </h3>
      <p className="content">
        {timing > 0 && (
          (
            <span>
              {`Vous allez être automatiquement redirigé dans ${timing} secondes`}
            </span>
          )
        )}
        {timing === 0 && (
          <span>
            {'Redirecting...'}
          </span>
        )}
      </p>
    </div>
  )
}

_.defaultProps = {
  delay: 5,
  redirect: '/',
}

_.propTypes = {
  delay: PropTypes.number,
  redirect: PropTypes.string,
}

export default _
