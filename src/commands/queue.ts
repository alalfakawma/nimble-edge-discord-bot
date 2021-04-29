import { Message } from 'discord.js';
import { queue } from '../index';

module.exports = {
    name: 'queue',
    callback: (msg: Message, _args: Array<string>) => {
        const queueList = queue.map(
            (item, index) => `**${(index + 1)}.** ${item.title} ${ (item.dispatcher) ? '** - (Playing)**' : '' }`
        );

        if (queueList.length) {
            msg.channel.send(queueList.join('\n'));
        } else {
            msg.channel.send("Queue ah hla a awmlo!");
        }
    },
};
