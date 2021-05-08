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

        // Leave channel
        const channel = msg.guild?.me?.voice.channel;
        channel?.leave();

        msg.channel.send('🚮 Queue cleared!');
    },
};
