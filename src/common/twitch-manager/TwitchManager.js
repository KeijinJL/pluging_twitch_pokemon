import tmi from 'tmi.js';
import Player from '../player/Player';

const players = [];
let onNewPlayerCallback = (channel, tags, message, self) => { };
let onNewMessageCallback = (player, channel, tags, message, self) => { };

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
                const player = players.find((player) => player.name === tags["display-name"]);
                if (player == undefined) {
                    onNewPlayerCallback(channel, tags, message, self);
                    players.push(new Player(tags["display-name"], message));
                }
                else if (message) {
                    onNewMessageCallback(player, channel, tags, message, self);
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
}

export default TwitchManager