import { Message } from 'discord.js';

module.exports = {
    name: 'ping',
    callback: (msg: Message) => {
        msg.channel.send('pong!');
    },
};
