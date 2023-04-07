import React, { useState } from 'react';
import EmoteView from '../components/emote/EmoteView';
import TwitchManager from '../common/twitch-manager/TwitchManager';
import Emote from '../common/emote/Emote.js';

const EmotesPage = () => {
    const [emotes, setEmotes] = useState([]);
    const [tags, setTags] = useState([]);

    TwitchManager.onNewEmote((channel, tags, message, self) => {
        const newEmotes = [];
        setTags(tags)
        Object.entries(tags.emotes).forEach(([id, positions]) => {
          Object.entries(positions).forEach(() => {
            newEmotes.push(new Emote(id));
          })
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
        //JSON.stringify(tags)
      }
    </div>
  );
}

export default EmotesPage;