import { Message } from 'discord.js';

module.exports = {
    name: 'help',
    callback: (msg: Message) => {
        msg.channel.send(`Commands: -help, -info, -ping`);
    },
};


