import { Message } from 'discord.js';
import { queue } from '../index';

module.exports = {
    name: 'queue',
    callback: (msg: Message, _args: Array<string>) => {
        const queueList = queue.map(
            (item, index) => `**${(index + 1)}.** ${item.title} ${ (item.dispatcher) ? '** - (Playing)**' : '' }`
        );

        if (queueList.length) {
            if (queueList.length > 50) {
                const first50 = queueList.slice(0, 50);
                msg.channel.send(`**First 50 songs..**\n${first50.join('\n')}`);
            } else {
                msg.channel.send(queueList.join('\n'));
            }
        } else {
            msg.channel.send("Queue ah hla a awmlo!");
        }
    },
};
