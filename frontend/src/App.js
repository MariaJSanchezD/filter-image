import './App.css'
import UploadedImage from './components/uploaded-image/uploaded-image'
import UploadImageForm from './components/upload-image-form/upload-image-form'
import FilteredImage from './components/filtered-image/filtered-image'
import ImagePlaceholder from './components/img-placeholder/img-placeholder'
import ErrorMsg from './components/error-msg/error-msg'
import { Component } from 'react'



const initialState = {
  errorImg: false,
  errorImgMsg: '',
  input: '',
  filterRange: '0',
  imageSrc: '',
  filteredImageSrc: ''
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  onInputChange = (event) => {
    // const response = axios.post(*acá va el endpoint*, {file: event.target.files[0]});
    const response = {url: 'https://i5.walmartimages.ca/images/Large/094/514/6000200094514.jpg'};
    if (!response.error) {
      this.setState({ imageSrc: response.url, errorImg: false, errorImgMsg: '' })
    } else {
      this.setState({ imageSrc: '', errorImg: true, errorImgMsg: response.error})
    }
  }

  onButtonSubmit = (event) => {
    // y acá mando la imagen junto con el rango seleccionado y retorno el url de la imagen filtrada, casi igual que arriba
    console.log('SUBMIT AAAAAAAA')
    if (Number(this.state.filterRange) === 0) {
      alert('At least select a filter percentage')
    } else {
      // const response = axios.post(*acá va el endpoint*, {range: this.state.filterRange});
      const response = {url: 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/56e608449cdbb7110015214e_365_-granny-smith-apple.1._TTD_._SR300,300_.jpg'};
      if (!response.error) {
        this.setState({ filteredImageSrc: response.url, errorImg: false, errorImgMsg: '' })
      } else {
        this.setState({ errorImg: true, errorImgMsg: response.error })
      }
    }
  }

  onRangeChange = (event) => {
    this.setState({ filterRange: event.target.value })
  }

  render() {
    return (
      <div className='App'>
        <div className='img-row-div'>
          {this.state.imageSrc ? (        <UploadedImage
          imageSrc={this.state.imageSrc} errorImg={this.state.errorImg} errorImgMsg={this.state.errorImgMsg}  />) :  <ImagePlaceholder text="No image uploaded"/>}
          {this.state.filteredImageSrc ? (<FilteredImage
          filteredImageSrc={this.state.filteredImageSrc} errorImg={this.state.errorImg} errorImgMsg={this.state.errorImgMsg} />) : <ImagePlaceholder text="Filter Image"/>}
        </div>
        <UploadImageForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          onRangeChange={this.onRangeChange}
          filterRange={this.state.filterRange} />
          <div className='row-center'>
          {this.state.errorImg ? (<ErrorMsg errorImgMsg={this.state.errorImgMsg} />) : (null)}
          </div>
      </div>
    )
  }
}

export default App
