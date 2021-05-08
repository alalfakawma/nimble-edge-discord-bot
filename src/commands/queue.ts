import { Message } from 'discord.js';
import { queue, embedMessage } from '../index';

module.exports = {
    name: 'queue',
    callback: (msg: Message, _args: Array<string>) => {
        const queueList = queue.map(
            (item, index) => `**${(index + 1)}.** ${item.title} ${ (item.dispatcher && !item.dispatcher.paused) ? '** - (Playing)**' : '' }`
        );

        let embed = embedMessage
            .setTitle('Song Queue:')
            .setDescription('Showing first 25 songs.')

        if (queueList.length) {
            if (queueList.length > 25) {
                const first25 = queueList.slice(0, 25);
                const restOfSongs = queueList.length - 25;
                embed.addField('----', first25.join('\n'));
                embed.setFooter(`${restOfSongs} more songs..`);
                msg.channel.send(embed);
            } else {
                embed.addField('----', queueList.join('\n'));
                msg.channel.send(embed);
            }
        } else {
            msg.channel.send(embedMessage.setDescription("🤷 Queue ah hla a awmlo!"));
        }
    },
};
