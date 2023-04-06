import React, { useState } from 'react';
import EmoteView from '../components/emote/EmoteView';
import TwitchManager from '../common/twitch-manager/TwitchManager';
import Emote from '../common/emote/Emote.js';

const EmotesPage = () => {
    const [emotes, setEmotes] = useState([]);

    TwitchManager.onNewEmote((channel, tags, message, self) => {
        const newEmotes = [];
        Object.entries(tags.emotes).forEach(([id, positions]) => {
            const emote = emotes.find((emote) => emote.id === id);
            if (emote == undefined) {
                newEmotes.push(new Emote(id));
            }
        })
        // @ts-ignore
        setEmotes(newEmotes);
    });

  return (
    <div className="EmotesPage">
      {
        emotes.map((emote, index) => {
          return <EmoteView id={emote.id} key={index} />
        })
      }
    </div>
  );
}

export default EmotesPage;