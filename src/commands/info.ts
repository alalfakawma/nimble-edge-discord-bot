import { Message } from 'discord.js';

module.exports = {
    name: 'info',
    callback: (msg: Message, _args: Array<string>) => {
        const guildUsers = msg.guild?.members.cache;
        const client = msg.client;
        guildUsers?.sweep(guildUser => guildUser.displayName === client.user?.username);

        const onlineMembers = guildUsers?.map(guildUser => guildUser.displayName).join(', ');
        const message = `
            **Source**: https://github.com/alalfakawma/nimble-edge-discord-bot
            **Hosted On**: https://heroku.com
            **Website**: https://nimble-edge.com
            **Online Members**: ${onlineMembers}
        `;
        msg.channel.send(message);
    },
};

