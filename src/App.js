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
      imageSource: '',
      imageUrl: ''
    }
  }


  onImageSrcChange = (event) => {
    this.setState({ imageSource: event.target.value });
  }

  onImageClick = () => {
    this.setState({ imageUrl: this.state.imageSource })
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
      function (response) {
        // do something with response
        console.log(response)
      },
      function (err) {
        // there was an error
      }
    );
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
        <ImageBar onImageSrcChange={this.onImageSrcChange} onImageClick={this.onImageClick} />
        <PictureBox imageUrl={this.state.imageSource} />
      </div>
    );
  }
}

export default App;
