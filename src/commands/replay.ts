import { Message } from 'discord.js';
import { queue } from '../index';
import { playYt } from './play';

module.exports = {
    name: 'replay',
    callback: (msg: Message, _args: Array<string>) => {
        const [ song ] = queue;

        song.dispatcher?.destroy();
        song.dispatcher = undefined;

        if (msg.member?.voice.connection) playYt(msg.member?.voice.connection, msg);
    },
};
