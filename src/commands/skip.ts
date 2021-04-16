import { Message } from 'discord.js';
import { queue } from '../index';

module.exports = {
    name: 'skip',
    callback: (msg: Message, _args: Array<string>) => {
        queue[0].dispatcher?.end();
        msg.channel.send("⏩ Skip meks!!");
    },
};
