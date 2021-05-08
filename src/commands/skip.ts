import { Message } from 'discord.js';
import { queue } from '../index';

module.exports = {
    name: 'skip',
    callback: (_msg: Message, _args: Array<string>) => {
        queue[0].dispatcher?.end();
    },
};
