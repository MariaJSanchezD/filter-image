import React from 'react'

const UploadImageForm = ({ onInputChange, onButtonSubmit, onRangeChange, filterRange }) => {
  return (
    <div>
      <h2 className='text-center'>
        {'Upload Image'}
      </h2>
      <div className='row-center'>
        <div className='form-container'>
          <input type='file' className='custom-file-input' onChange={onInputChange}></input>
          <input type='range' onChange={onRangeChange} value={filterRange} ></input>
          <h3>{filterRange ? filterRange : 0}</h3>
          <button
            className='filter-button'
            onClick={onButtonSubmit}>
            Filter
          </button>
        </div>
      </div>
    </div>
  )
}

export default UploadImageForm
