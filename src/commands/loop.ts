import { Message } from 'discord.js';
import { queue, neb } from '../index';

module.exports = {
    name: 'loop',
    callback: (msg: Message, _args: Array<string>) => {
        const [ song ] = queue;

        if (neb.loop) {
            neb.loop = false;
            msg.channel.send(`❌ Loop off`);
        } else {
            if (song) {
                neb.loop = true;
                msg.channel.send(`🔄 Looping ${song.title}`);
            } else {
                msg.channel.send('✋ Hla awmloh hi mawle!');
            }
        }
    },
};
