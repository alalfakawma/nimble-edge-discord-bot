const Discord = require('discord.js');
const client = new Discord.Client();

// dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Command keyword
const KEYWORD = '-neb';

// Commands list
const COMMANDS = [
    {
        command: 'lam rawh le',
        callback: () => {
            return 'lam meks!!';
        },
    },
];

client.on('ready', () => {
    console.log(`Nimble Edge Bot is now online!`);
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

client.login(process.env.TOKEN);
