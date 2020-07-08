import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Logo from "./Components/Logo/Logo";
import ImageBar from "./Components/ImageBar/ImageBar";
import Rank from "./Components/Rank/Rank";
import PictureBox from "./Components/PictureBox/PictureBox";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import Particles from "react-particles-js";
import particleOptions from "./particlesjs-config.json";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "811d1551954b488db6418389c99a61e5",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
  }

  calculateFaceLocation = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const picture = document.getElementById("faceImg");
    const width = Number(picture.width);
    const height = Number(picture.height);
    return {
      leftCol: faceData.left_col * width,
      rightCol: width - faceData.right_col * width,
      topRow: faceData.top_row * height,
      bottomRow: height - faceData.bottom_row * height,
    };
  };

  // todo make box an array and use it to create multiples

  displayFaceBox = (box) => {
    this.updateEntries();
    this.setState({ box: box });
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onImageSrcChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onImageClick = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
      .then((response) => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (destination) => {
    if (destination === "home") {
      this.setState({ isSignedIn: true });
    } else this.setState({ isSignedIn: false });
    this.setState({ route: destination });
  };

  updateEntries = () => {
    const data = {
      email: this.state.user.email
    }

    fetch('http://localhost:3000/image', {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(entries => {
        let xState = this.state.user;
        xState.entries = entries.entries;
        this.setState(xState);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  render() {
    const { input, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <NavBar
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "signin" ? (
          <div>
            <Logo />
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          </div>
        ) : route === "register" ? (
          <div>
            <Logo />
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          </div>
        ) : (
              <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageBar
                  onImageSrcChange={this.onImageSrcChange}
                  onImageClick={this.onImageClick}
                />
                <PictureBox imageUrl={input} box={box} />
              </div>
            )}
      </div>
    );
  }
}

export default App;
