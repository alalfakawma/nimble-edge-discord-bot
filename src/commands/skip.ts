import { Message } from 'discord.js';
import { queue, neb } from '../index';
import { playYt } from '../util/playYt';

module.exports = {
    name: 'skip',
    callback: (msg: Message, args: Array<string>) => {
        const [ song ] = queue;

        // Check if n amounts to skip is provided
        if (args.length) {
            const skipAmount = parseFloat(args[0]);

            if (isNaN(skipAmount)) {
                // If the first argument input is not a number
                return msg.channel.send(`🤚 Number a nih angai!`);
            } else if (skipAmount > (queue.length)) {
                return msg.channel.send(`🤚 ${queue.length} aia tlem aw!`);
            } else {
                // First check if something is playing, stop it.
                if (song.dispatcher) {
                    song.dispatcher.destroy();
                }
                // Skip the tracks
                queue.splice(0, skipAmount);

                // Start playing from the skip
                if (neb.voiceConnection) playYt(neb.voiceConnection, msg);
            }
        } else {
            song.dispatcher?.end();
        }
    },
};
