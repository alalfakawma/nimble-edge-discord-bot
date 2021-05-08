import { Message } from 'discord.js';
import { queue } from '../index';

module.exports = {
    name: 'clearqueue',
    callback: (msg: Message, _args: Array<string>) => {
        const [ song ] = queue;
        if (song.dispatcher) {
            song.dispatcher.destroy();
        }
        queue.length = 0;
        msg.channel.send('🚮 Queue cleared!');
    },
};
