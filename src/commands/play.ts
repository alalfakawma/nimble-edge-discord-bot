import ytdl from 'ytdl-core';
import { search } from 'yt-search';
import { Message, MessageEmbed } from 'discord.js';
import { queue, neb, searchResults } from '../index';
import ytpl from 'ytpl';
import { playYt } from '../util/playYt';

module.exports = {
    name: 'play',
    callback: async (msg: Message, args: Array<string>) => {
        const voiceChannel = msg.member?.voice.channel;

        const embed = new MessageEmbed()
            .setColor(neb.color);

        if (!voiceChannel) return msg.channel.send('Voice channel ah i awm angai! Mimawl!');

        const isURL = new RegExp(/^(http|https).*\.[a-z]{2,}/);

        if (!args[0] && !queue.length) return msg.channel.send("Link chuuu! Mimawl!");
        else if (args[0]) {
            // Argument is not a link
            if (!isURL.test(args[0])) {
                if (searchResults.length && !isNaN(parseFloat(args[0]))) {
                    const index = (parseFloat(args[0]));
                    if (index > 10 || index < 0) return msg.channel.send("1 leh 10 inkar thlang mai teh!");
                    else {
                        const song = searchResults[index - 1];
                        queue.push(song);
                        if (queue.length > 1) msg.channel.send(embed.setDescription(`👍 **Added to queue:** ${song.title}`));
                    }
                } else {
                    const song: { title: string, url: string } = await new Promise((resolve, _rej) => {
                        search(args.join(' '), (err, res) => {
                            if (err) {
                                return msg.channel.send("🛑 Diklo a awm meks, ti tha leh chhin rawh!");
                            }

                            resolve({
                                title: res.videos[0].title,
                                url: res.videos[0].url,
                            });
                        });
                    });
                    queue.push(song);
                    if (queue.length > 1) msg.channel.send(embed.setDescription(`👍 **Added to queue:** ${song.title}`));
                }
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
                    if (queue.length > 1) msg.channel.send(embed.setDescription(`👍 **Added to queue:** ${queue[queue.length - 1].title}`));
                } else {
                    return msg.channel.send("🛑 Youtube link a nilo tlat mai, ti tha leh rawh!");
                }
            }
        }

        // First check if song is already playing
        const [ song ] = queue;

        if (!song.dispatcher) {
            if (!msg.member?.voice.connection) {
                msg.member?.voice.channel?.join().then(connection => {
                    neb.voiceConnection = connection;
                    playYt(connection, msg);
                });
            }
        }
    },
};
