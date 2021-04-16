import ytdl from 'ytdl-core';
import { search } from 'yt-search';
import { Message, VoiceConnection } from 'discord.js';
import { queue } from '../index';

module.exports = {
    name: 'play',
    callback: (msg: Message, args: Array<string>) => {
        const voiceChannel = msg.member?.voice.channel;

        if (!voiceChannel) return msg.channel.send('Voice channel ah i awm angai! Mimawl!');

        if (!args[0]) return msg.channel.send("Link chuuu! Mimawl!");
        else {
            if (!ytdl.validateURL(args[0])) {
                return msg.channel.send("Youtube link chiah ka play thei!");
            }
        }

        if (queue.length) msg.channel.send("👍 Queue meks!");

        queue.push({
            url: args[0],
        });

        if (!msg.member?.voice.connection) {
            msg.member?.voice.channel?.join().then(connection => {
                if (!queue[0].dispatcher) {
                    playYt(connection);
                }
            });
        }
    },
};

function playYt(connection: VoiceConnection) {
    if (queue.length) {
        queue[0].dispatcher = connection.play(ytdl(queue[0].url, { filter: 'audioonly', }));

        queue[0].dispatcher.on("finish", () => {
            // Remove item from queue
            queue.shift();

            // Play the next
            playYt(connection);
        });
    }
}
