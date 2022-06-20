
import React from 'react'

const FilteredImage = ({filteredImageSrc}) => {
  return (
    <div>
      <h3 className='text-center'>Filtered Image</h3>
      <div>
        <img
          id='inputimage'
          src={filteredImageSrc}
          className='img-container'
          alt='Filtered'
        />
      </div>
    </div>
  )
}

export default FilteredImage