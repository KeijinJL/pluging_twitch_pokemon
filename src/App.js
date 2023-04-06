import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SpritePage from './pages/SpritePage';
import EmotesPage from './pages/EmotesPage';
import './App.css';
import TwitchManager from './common/twitch-manager/TwitchManager';

function App() {
  TwitchManager.init('keijinjl');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpritePage />} />
        <Route path="/Emotes" element={<EmotesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
