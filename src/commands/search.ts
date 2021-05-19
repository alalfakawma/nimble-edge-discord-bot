import { Message, MessageEmbed } from 'discord.js';
import {search} from 'yt-search';
import {searchResults} from '../index';

module.exports = {
    name: 'search',
    callback: (msg: Message, args: Array<string>) => {
        const embed = new MessageEmbed()
            .setColor('#FBAB81');

        const q = args.join(' ');

        if (!args.length) msg.channel.send(embed.setDescription(`Search tur dah tel ta che! Mimawl!`));
        else {
            search(q, (_err, res) => {
                embed.setTitle(`Search results for '${q}'`)
                    .setDescription('Type -play {number} to play. (results saved for 10 seconds)');

                const results = res.videos;

                for (let i = 0; i < 10; ++i) {
                    const video = results[i];

                    embed.addField(`${(i + 1)} ${video.title}`, '');

                    searchResults.push({
                        title: video.title,
                        url: video.url,
                    });
                }

                msg.channel.send(embed);

                // 10 second timeout to clear the search cache
                setTimeout(() => {
                    searchResults.length = 0;
                }, 10000);

            });
        }
    },
};
