import { Message, Client, Collection } from "discord.js";
import * as fs from 'fs';

// dotenv
let fileExt = '.ts';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    fileExt = '.js';
}

const client = new Client();

// Command keyword
const KEYWORD: string = '-';

const COMMANDS: Collection<string, { name: string, callback: CallableFunction }> = new Collection();
const COMMAND_DIR = __dirname + '/commands';

const commandFiles = fs.readdirSync(COMMAND_DIR).filter(file => file.endsWith(fileExt));

commandFiles.forEach(file => {
    const command = require(`${COMMAND_DIR}/${file}`);

    COMMANDS.set(command.name, command);
});

client.on('ready', () => {
    console.log(`Nimble Edge Bot is now online!`);
});

client.on('message', (msg: Message) => {
    const command = msg.content.replace(KEYWORD, '').trim();

    if (msg.content.startsWith(KEYWORD)) {
        COMMANDS.get(command)?.callback(msg);
    }
});

client.login(process.env.TOKEN);
