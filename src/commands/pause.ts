import { Message } from 'discord.js';
import { queue } from '../index';

module.exports = {
    name: 'pause',
    callback: (msg: Message, _args: Array<string>) => {
        const [ song ] = queue;

        if (song && song.dispatcher) {
            song.dispatcher.pause();
        }
    },
};
