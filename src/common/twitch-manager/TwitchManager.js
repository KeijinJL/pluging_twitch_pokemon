import tmi from 'tmi.js';
import Player from '../player/Player';
import Emote from '../emote/Emote';

const players = [];
const emotes = [];
let onNewPlayerCallback = (channel, tags, message, self) => { };
let onNewMessageCallback = (player, channel, tags, message, self) => { };
let onNewEmoteCallback = (channel, tags, message, self) => { };

class TwitchManager {

    static init(channel) {
        const client = new tmi.Client({
            options: { debug: false },
            connection: {
                secure: true,
                reconnect: true,
            },
            channels: [channel]
        });
        client.connect();
        client.on('message', (channel, tags, message, self) => {
            if (tags && tags["display-name"]) {
                let player = players.find((player) => player.name === tags["display-name"]);
                if (player == undefined) {
                    player = new Player(tags["display-name"])
                    players.push(player);
                    onNewPlayerCallback(channel, tags, message, self);
                }
                if (message) {
                    onNewMessageCallback(player, channel, tags, message, self);
                    if (tags.emotes) {
                        Object.entries(tags.emotes).forEach(([id, positions]) => {
                            Object.entries(positions).forEach(() => {
                              onNewEmoteCallback(channel, tags, message, self);
                              emotes.push(new Emote(id));
                            })
                        })
                    }
                }
            }
        });
    }

    static onNewPlayer(callback) {
        onNewPlayerCallback = callback;
    }

    static onNewMessage(callback) {
        onNewMessageCallback = callback;
    }

    static onNewEmote(callback) {
        onNewEmoteCallback = callback;
    }
}

export default TwitchManager