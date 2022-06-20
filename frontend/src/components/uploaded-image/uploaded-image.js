
import React from 'react'

const UploadedImage = ({imageSrc}) => {
  return (
    <div>
      <h3 className='text-center'>Original Image</h3>
      <div>
        <img
          id='inputimage'
          src={imageSrc}
          className='img-container'
          alt='Original'
        />
      </div>
    </div>
  )
}

export default UploadedImage