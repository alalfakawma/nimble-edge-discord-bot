import ytdl from 'ytdl-core';
import { search } from 'yt-search';
import { Message, VoiceConnection } from 'discord.js';
import { queue, neb, embedMessage } from '../index';
import ytpl from 'ytpl';

module.exports = {
    name: 'play',
    callback: async (msg: Message, args: Array<string>) => {
        const voiceChannel = msg.member?.voice.channel;

        if (!voiceChannel) return msg.channel.send('Voice channel ah i awm angai! Mimawl!');

        const isURL = new RegExp(/^(http|https).*\.[a-z]{2,}/);

        if (!args[0] && !queue.length) return msg.channel.send("Link chuuu! Mimawl!");
        else if (args[0]) {
            // Argument is not a link
            if (!isURL.test(args[0])) {
                const song: { title: string, url: string } = await new Promise((resolve, _rej) => {
                    search(args.join(' '), (err, res) => {
                        if (err) {
                            return msg.channel.send(embedMessage.setDescription('🛑 Diklo a awm meks, ti tha leh chhin rawh!'));
                        }

                        resolve({
                            title: res.all[0].title,
                            url: res.all[0].url,
                        });
                    });
                });
                queue.push(song);
                if (queue.length > 1) msg.channel.send(embedMessage.setDescription(`👍 **Added to queue:** ${song.title}`));
            } else {
                // If the argument is a link
                // First validate if the link is a playlist link or not
                if (ytpl.validateID(args[0])) {
                    const playlistSongs = await ytpl(args[0]);
                    playlistSongs.items.forEach(item => {
                        queue.push({
                            title: item.title,
                            url: item.shortUrl,
                        });
                    });
                    msg.channel.send('👍 Add zo vek e!!');
                } else if (ytdl.validateURL(args[0])) {
                    const songInfo = (await ytdl.getInfo(args[0])).videoDetails;
                    queue.push({
                        title: songInfo.title,
                        url: args[0],
                    });
                    if (queue.length > 1) msg.channel.send(embedMessage.setDescription(`👍 **Added to queue:** ${queue[queue.length - 1].title}`));
                } else {
                    return msg.channel.send("🛑 Youtube link a nilo tlat mai, ti tha leh rawh!");
                }
            }
        }

        if (!msg.member?.voice.connection) {
            msg.member?.voice.channel?.join().then(connection => {
                playYt(connection, msg);
            });
        }
    },
};

function playYt(connection: VoiceConnection, msg: Message) {
    if (queue.length) {
        if (neb.voiceTimeout) msg.client.clearTimeout(neb.voiceTimeout);

        const [ song ] = queue;

        if (!song.dispatcher) {
            song.dispatcher = connection.play(ytdl(song.url, { filter: 'audioonly', }));

            msg.channel.send(embedMessage.setDescription(`🎶 **Now Playing:** ${song.title}`));

            song.dispatcher.on("finish", () => {
                // Remove item from queue
                queue.shift();

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
