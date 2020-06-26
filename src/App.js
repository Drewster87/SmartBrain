import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Logo from './Components/Logo/Logo';
import ImageBar from './Components/ImageBar/ImageBar';
import Rank from './Components/Rank/Rank';
import PictureBox from './Components/PictureBox/PictureBox';
import Particles from 'react-particles-js';
import particleOptions from './particlesjs-config.json';
import Clarifai from 'clarifai'

// Heads up that the Clarifai API has been updated since I made the next video. You will get an error using Clarifai.DETECT_FACE,  it appears to have changed (Read more about it here: https://clarifai.com/developer/guide).

// Also, the URL in the next video has also been updated. Keep this in mind as you go through the exercise:

// // This part has been updated with the recent Clarifai changes. Used to be:
// // .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
// app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)

const app = new Clarifai.App({
  apiKey: '811d1551954b488db6418389c99a61e5'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box
    const picture = document.getElementById('faceImg');
    const width = Number(picture.width);
    const height = Number(picture.height);
    return {
      leftCol: faceData.left_col * width,
      rightCol: width - (faceData.right_col * width),
      topRow: faceData.top_row * height,
      bottomRow: height - (faceData.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onImageSrcChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onImageClick = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
        />
        <NavBar />
        <Logo />
        <Rank />
        <ImageBar
          onImageSrcChange={this.onImageSrcChange}
          onImageClick={this.onImageClick} />
        <PictureBox imageUrl={this.state.input} box={this.state.box} />
      </div>
    );
  }
}

export default App;
