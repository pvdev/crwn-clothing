import React from 'react'

import './error-boundary.styles.scss'

class ErrorBoundary extends React.Component {
  constructor() {
    super()

    this.state = {
      hasErrored: false,
    }
  }

  static getDerivedStateFromError(error) {
    // process error here

    return { hasErrored: true }
  }

  componentDidCatch(error, info) {
    console.error('Error: ', error)
    console.log('Info : ', info)
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className='error-container'>
          <div className='error-image' />
          <h2 className='error-text'>Sorry, this page is broken.</h2>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
