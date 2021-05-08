import { Message } from 'discord.js';
import { queue } from '../index';
import { MessageEmbed } from 'discord.js';

module.exports = {
    name: 'queue',
    callback: (msg: Message, _args: Array<string>) => {
        const queueList = queue.map(
            (item, index) => `**${(index + 1)}.** ${item.title} ${ (item.dispatcher && !item.dispatcher.paused) ? '** - (Playing)**' : '' }`
        );

        const embed = new MessageEmbed()
            .setColor('#FBAB81')
            .setTitle('Song Queue:')
            .setDescription('Showing first 25 songs.')

        if (queueList.length) {
            if (queueList.length > 25) {
                const first25 = queueList.slice(0, 25);
                embed.addField('----', first25.join('\n'));
                msg.channel.send(embed);
            } else {
                embed.addField('----', queueList.join('\n'));
                msg.channel.send(embed);
            }
        } else {
            msg.channel.send("🤷 Queue ah hla a awmlo!");
        }
    },
};
