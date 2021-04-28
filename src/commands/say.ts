import { Message } from 'discord.js';

module.exports = {
    name: 'say',
    callback: (msg: Message, args: Array<string>) => {
        msg.channel.send(
            `> ${args.join(' ')}\n> Sawited by: ${ msg.member?.user.username }.`
        );
    },
};
