import { Message } from 'discord.js';
import { queue } from '../index';

module.exports = {
    name: 'clearqueue',
    callback: (msg: Message, _args: Array<string>) => {
        queue.length = 0;
        msg.channel.send('🚮 Queue cleared!');
    },
};
