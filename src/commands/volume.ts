import { Message } from 'discord.js';
import { queue, volume, setVolume } from '../index';

module.exports = {
    name: 'volume',
    callback: (msg: Message, args: Array<string>) => {
        if (!args[0]) {
            msg.channel.send(`🔉 Volume: ${(volume * 100).toFixed()}`);
        } else {
            const newVolume = parseInt(args[0]);

            if (isNaN(newVolume) || (newVolume < 0 || newVolume > 100)) {
                return msg.channel.send("Number 0 atanga 100 inkar anih angai!");
            }

            // Set new volume
            setVolume(newVolume / 100);

            // If playing, change current song volume
            if (queue.length) {
                const song = queue[0];

                if (song.dispatcher) {
                    song.dispatcher?.setVolume(newVolume / 100);
                }
            }

            msg.channel.send(`🔉 Volume: ${newVolume}`);
        }
    },
};
