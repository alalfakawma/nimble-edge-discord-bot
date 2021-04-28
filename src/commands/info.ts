import { Message } from 'discord.js';

module.exports = {
    name: 'info',
    callback: (msg: Message, _args: Array<string>) => {
        const guildUsers = msg.guild?.members.cache;
        const client = msg.client;
        guildUsers?.sweep(guildUser => guildUser.displayName === client.user?.username);

        const onlineMembers = guildUsers?.map(guildUser => guildUser.displayName).join(', ');
        const message = `
            **Source**: https://github.com/alalfakawma/nimble-edge-discord-bot\n
            **Hosted On**: https://heroku.com\n
            **Website**: https://nimble-edge.com\n
            **Online Members**: ${onlineMembers}
        `;
        msg.channel.send(message);
    },
};

