import get from 'lodash.get'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

class Stream extends PureComponent {
  constructor () {
    super()
    this.state = { currentIndex: 0 }
  }

  componentDidMount () {
    const { intervalTime } = this.props
    this.indexInterval = setInterval(
      this.handleIncrement,
      intervalTime
    )
  }

  componentWillUnmount () {
    if (this.indexInterval){
      clearInterval(this.indexInterval)
    }
  }

  handleIncrement = () => {
    this.setState(({ currentIndex }) => {
      const { children } = this.props
      if (get(children, 'length')) {
        if (currentIndex < children.length - 1) {
          return {
            currentIndex: currentIndex + 1
          }
        }
        return {
          currentIndex: 0
        }
      }
      return {
        currentIndex: 0
      }
    })
  }

  render () {
    const { children, transitionTimeout } = this.props
    const { currentIndex } = this.state

    const childrenWithStreamStyle = children.map(
      (child, index) => React.cloneElement(child, {
        key: child.key,
        style: {
          opacity: index === currentIndex ? 1 : 0,
          position: 'absolute',
          transition: `opacity ${transitionTimeout}ms`
        }
      })
    )

    return childrenWithStreamStyle
  }
}


Stream.defaultProps = {
  intervalTime: 5000,
  transitionTimeout: 1000
}

Stream.propTypes = {
  children: PropTypes.array.isRequired,
  intervalTime: PropTypes.number,
  transitionTimeout: PropTypes.number,
}

export default Stream
