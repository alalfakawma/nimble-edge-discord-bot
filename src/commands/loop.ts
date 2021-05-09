import { Message } from 'discord.js';
import { queue, neb } from '../index';

module.exports = {
    name: 'loop',
    callback: (msg: Message, _args: Array<string>) => {
        const [ song ] = queue;
        neb.loop = true;
        msg.channel.send(`🔄 Looping ${song.title}`);
    },
};
