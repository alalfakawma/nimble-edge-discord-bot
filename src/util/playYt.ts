import { VoiceConnection, Message, MessageEmbed } from 'discord.js';
import ytdl from 'ytdl-core';
import { queue, neb } from '../index';

export const playYt = (connection: VoiceConnection, msg: Message) => {
    if (queue.length) {
        if (neb.voiceTimeout) msg.client.clearTimeout(neb.voiceTimeout);

        const [song] = queue;

        if (!song.dispatcher) {
            song.dispatcher = connection.play(ytdl(song.url, { filter: 'audioonly', }));

            const embed = new MessageEmbed()
                .setColor(neb.color)
                .setDescription(`🎶 **Now Playing:** ${song.title}`);

            msg.channel.send(embed);

            song.dispatcher.on("finish", () => {
                // Remove item from queue
                if (!neb.loop) {
                    queue.shift();
                }

                // Play the next
                playYt(connection, msg);
            });
        } else if (song.dispatcher.paused) {
            msg.channel.send("▶ Resume meks!!");
            song.dispatcher.resume();
        }

        song.dispatcher.setVolume(neb.volume);
    } else {
        const channel = msg.guild?.me?.voice.channel;
        neb.voiceTimeout = msg.client.setTimeout(channel => {
            channel.leave();
        }, 10000, channel);
    }
}
