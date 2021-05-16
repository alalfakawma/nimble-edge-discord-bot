import { Message } from 'discord.js';
import { queue, neb } from '../index';
import { MessageEmbed } from 'discord.js';

module.exports = {
    name: 'queue',
    callback: (msg: Message, args: Array<string>) => {
        const queueList = queue.map(
            (item, index) => `**${(index + 1)}.** ${item.title.replace('**', '##')} ${ (item.dispatcher && !item.dispatcher.paused) ? '** - (Playing)**' : '' }`
        );

        let embed = new MessageEmbed()
            .setColor('#FBAB81')
            .setTitle('Song Queue:')
            .setDescription('Showing first 20 songs..')

        if (queueList.length) {
            if (queueList.length > 20) {
                if (args.length) {
                    const [ command ] = args;

                    if (command === 'end') {
                        const last20 = queueList.slice(-20);
                        embed.setDescription('Showing last 20 songs..')
                            .addField('----', last20.join('\n'));
                        msg.channel.send(embed);
                    } else {
                        msg.channel.send('**Usage:** -queue [end]');
                    }
                } else {
                    const first20 = queueList.slice(0, 20);
                    const restOfSongs = queueList.length - 20;
                    embed.addField('----', first20.join('\n'))
                        .setFooter(`${restOfSongs} more songs..`);
                    msg.channel.send(embed);
                }
            } else {
                embed.setDescription('');
                embed.addField('----', queueList.join('\n'));
                msg.channel.send(embed);
            }
        } else {
            const embed = new MessageEmbed()
                .setColor('#FBAB81')
                .setDescription('🤷 Queue ah hla a awmlo!');
            msg.channel.send(embed);
        }
    },
};
