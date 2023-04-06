import React, { useState } from 'react';
import PlayerView from '../components/player/PlayerView';
import TwitchManager from '../common/twitch-manager/TwitchManager';
import Player from '../common/player/Player';

const SpritePage = () => {
  const [players, setPlayers] = useState([]);

  TwitchManager.onNewPlayer((channel, tags, message, self) => {
    const newPlayers = [...players, new Player(tags["display-name"], message)];
    // @ts-ignore
    setPlayers(newPlayers);
  });

  return (
    <div className="SpritePage">
      {
        players.map((player, index) => {
          return <PlayerView player={player} name={player.name} initMessage={player.message} avatar={player.avatar} key={index} />
        })
      }
    </div>
  );
}

export default SpritePage;