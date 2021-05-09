import { Message, MessageEmbed } from 'discord.js';
import { queue, neb } from '../index';

module.exports = {
    name: 'loop',
    callback: (msg: Message, _args: Array<string>) => {
        const [ song ] = queue;

        const embed = new MessageEmbed()
            .setColor(neb.color);

        if (neb.loop) {
            neb.loop = false;
            msg.channel.send(embed.setDescription(`❎ Loop off`));
        } else {
            if (song) {
                neb.loop = true;
                msg.channel.send(embed.setDescription(`🔄 Looping ${song.title}`));
            } else {
                msg.channel.send('✋ Hla awmloh hi mawle!');
            }
        }
    },
};
