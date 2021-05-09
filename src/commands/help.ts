import { Message } from 'discord.js';
import { COMMANDS } from '../index';

module.exports = {
    name: 'help',
    callback: (msg: Message, args: Array<string>) => {
        const commands = COMMANDS.array();

        if (args.length) {
            const [ helpItem ] = args;

            commands.forEach(command => {
                if (helpItem === command.name) {

                }
            });
        }

        msg.channel.send(`**Commands**: ${COMMANDS.map(command => command.name).join(', ')}`);
    },
};
