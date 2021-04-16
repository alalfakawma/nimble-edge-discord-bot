const Discord = require('discord.js');
const client = new Discord.Client();

const KEYWORD = '-neb';

const COMMANDS = [
    {
        command: 'lam rawh le',
        callback: () => {
            return 'lam meks!!';
        },
    },
];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const command = msg.content.replace(KEYWORD, '').trim();

    if (msg.content.startsWith(KEYWORD)) {
        COMMANDS.forEach(c => {
            if (c.command === command) {
                msg.reply(c.callback());
            }
        });
    }
});

client.login('ODMyMzQwMzkwNTU5NzQ0MDMx.YHiXZQ.Tt5Fe-diZ50-_V0KTwMlbaiZANk');
