import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SpritePage from './pages/SpritePage';
import './App.css';
import TwitchManager from './common/twitch-manager/TwitchManager';

function App() {
  TwitchManager.init('kieirra');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpritePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
