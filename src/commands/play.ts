import ytdl from 'ytdl-core';
import { search } from 'yt-search';
import { Message, VoiceConnection } from 'discord.js';
import { queue, neb } from '../index';

module.exports = {
    name: 'play',
    callback: async (msg: Message, args: Array<string>) => {
        const voiceChannel = msg.member?.voice.channel;

        if (!voiceChannel) return msg.channel.send('Voice channel ah i awm angai! Mimawl!');

        if (!args[0] && !queue.length) return msg.channel.send("Link chuuu! Mimawl!");
        else if (args[0]) {
            if (!ytdl.validateURL(args[0])) {
                const song: { title: string, url: string } = await new Promise((resolve, _rej) => {
                    search(args.join(' '), (err, res) => {
                        if (err) {
                            return msg.channel.send("🛑 Youtube link a nilo tlat mai! Ti tha leh rawh!");
                        }

                        resolve({
                            title: res.all[0].title,
                            url: res.all[0].url,
                        });
                    });
                });
                queue.push(song);
            } else {
                const songInfo = (await ytdl.getInfo(args[0])).videoDetails;
                queue.push({
                    title: songInfo.title,
                    url: args[0],
                });
            }

            if (queue.length > 1) msg.channel.send(`👍 **Added to queue:** ${queue[queue.length - 1].title}`);
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

            msg.channel.send(`🎶 **Now Playing:** ${song.title}`);

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
