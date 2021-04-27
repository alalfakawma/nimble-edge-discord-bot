import { Message } from 'discord.js';
import { queue, neb } from '../index';

module.exports = {
    name: 'stop',
    callback: (msg: Message, _args: Array<string>) => {
        if (queue[0]) {
            queue[0].dispatcher?.destroy();
            queue[0].dispatcher = undefined;
            msg.channel.send("🛑 Stop meks!!");
            const channel = msg.guild?.me?.voice.channel;
            neb.voiceTimeout = msg.client.setTimeout(channel => {
                channel.leave();
            }, 10000, channel);
        }
    },
};
