import { Message } from 'discord.js';
import { queue } from '../index';

module.exports = {
    name: 'queue',
    callback: (msg: Message, _args: Array<string>) => {
        const queueList = queue.map(
            (item, index) => `**${(index + 1)}.** ${item.title} ${ (item.dispatcher) ? '** - (Playing)**' : '' }`
        );

        if (queueList.length) {
            if (queueList.length > 25) {
                const first25 = queueList.slice(0, 25);
                msg.channel.send(`**First 25 songs..**\n${first25.join('\n')}`);
            } else {
                msg.channel.send(queueList.join('\n'));
            }
        } else {
            msg.channel.send("Queue ah hla a awmlo!");
        }
    },
};
