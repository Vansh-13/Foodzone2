import React from 'react'
import "./AppDownload.css";
import { assets } from '../../assets/assets';

function AppDownload() {
  return (
    <div className='app-download' id='app-download'>
      <p>
        For a better experience, <br /> download the <strong>FoodZone App</strong>
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="Play Store" />
        <img src={assets.app_store} alt="App Store" />
      </div>
    </div>
  );
}

export default AppDownload;
