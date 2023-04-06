import React, { useRef, useState } from 'react';
import tmi from 'tmi.js';
import './App.css';
import Player from './player/Player';

function App() {
  const data = localStorage.getItem("players") || "[]";
  const [players, setPlayers] = useState(JSON.parse(data));

  const client = new tmi.Client({
    options: { debug: false },
    connection: {
      secure: true,
      reconnect: true,
    },
    channels: ['kieirra']
  });

  client.connect();

  client.on('message', (channel, tags, message, self) => {

    if (tags && tags["display-name"]) {
      if (!players.includes(tags["display-name"])) {
        const newPlayers = [...players, { pseudo: tags["display-name"], message }];
        localStorage.setItem("players", JSON.stringify(newPlayers));
        setPlayers(newPlayers);
      }
    }
  });

  return (
    <div className="App">
      {
        players.map((player, index) => {
          return <Player pseudo={player.pseudo} message={player.message} key={index} />
        })
      }
    </div>
  );
}

export default App;
