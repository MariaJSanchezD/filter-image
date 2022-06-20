
import React from 'react'

const ErrorMsg = ({errorImgMsg}) => {
  return (
    <div className='error-container'>
      <h3 className='text-center'>{errorImgMsg}</h3>
    </div>
  )
}

export default ErrorMsg