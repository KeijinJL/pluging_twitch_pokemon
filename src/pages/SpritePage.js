import React, { useState } from 'react';
import PlayerView from '../components/player/PlayerView';
import TwitchManager from '../common/twitch-manager/TwitchManager';
import Player from '../common/player/Player';

const SpritePage = () => {
  const [players, setPlayers] = useState([]);

  TwitchManager.onNewPlayer((channel, tags, message, self) => {
    const newPlayers = [...players, new Player(tags["display-name"])];
    // @ts-ignore
    setPlayers(newPlayers);
  });

  return (
    <div className="SpritePage">
      {
        players.map((player, index) => {
          return <PlayerView name={player.name} key={index} />
        })
      }
    </div>
  );
}

export default SpritePage;