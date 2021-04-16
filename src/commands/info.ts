import { Message } from 'discord.js';

module.exports = {
    name: 'info',
    callback: (msg: Message) => {
        const guildUsers = msg.guild?.members.cache;
        const client = msg.client;
        guildUsers?.sweep(guildUser => guildUser.displayName === client.user?.username);

        const onlineMembers = guildUsers?.map(guildUser => guildUser.displayName).join(', ');
        const message = `**Website**: https://nimble-edge.com\n**Online Members**: ${onlineMembers}`;
        msg.channel.send(message);
    },
};

