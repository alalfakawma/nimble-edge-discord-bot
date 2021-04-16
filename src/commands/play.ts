import ytdl from 'ytdl-core';
import { search } from 'yt-search';
import { Message } from 'discord.js';

module.exports = {
    name: 'play',
    callback: (msg: Message) => {
        const voiceChannel = msg.member?.voice.channel;
        if (!voiceChannel) return msg.channel.send('You need to be in a voice channel!');
    },
};
