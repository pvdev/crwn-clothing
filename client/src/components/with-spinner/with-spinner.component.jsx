import React from 'react'

import './with-spinner.styles.scss'

const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <div className='spinner_overlay'>
        <div className='spinner_container' />
      </div>
    ) : (
      <WrappedComponent {...otherProps} />
    )
  }
  return Spinner
}

export default WithSpinner
