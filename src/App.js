import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Logo from './Components/Logo/Logo';
import ImageBar from './Components/ImageBar/ImageBar';
import PictureBox from './Components/PictureBox/PictureBox';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Logo />
      <ImageBar />
      <PictureBox />
    </div>
  );
}

export default App;
