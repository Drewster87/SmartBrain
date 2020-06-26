import React from 'react';
import logo from './logo.png';
import Tilt from 'react-tilt';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt" options={{ max: 60 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner">
                    <img src={logo} alt="" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;