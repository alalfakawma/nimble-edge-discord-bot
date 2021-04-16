import { Message } from 'discord.js';
import { queue } from '../index';

module.exports = {
    name: 'stop',
    callback: (msg: Message, _args: Array<string>) => {
        queue[0].dispatcher?.destroy();
        queue[0].dispatcher = undefined;
        msg.channel.send("🛑 Stop meks!!");
    },
};
