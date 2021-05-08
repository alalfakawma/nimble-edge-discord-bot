import { Message, Client, Collection, StreamDispatcher, MessageEmbed } from "discord.js";
import * as fs from 'fs';

export let queue: { title: string, url: string, dispatcher?: StreamDispatcher }[] = [];

export let neb: { volume: number, voiceTimeout?: NodeJS.Timeout } = {
    volume: 1,
};

export let embedMessage = new MessageEmbed()
    .setColor('#FBAB81');

// dotenv
let fileExt = '.js';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    fileExt = '.ts';
}

const client = new Client();

// CONSTANTS
const KEYWORD: string = '-';
export const COMMANDS: Collection<string, { name: string, callback: CallableFunction }> = new Collection();
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
    const args = msg.content.substring(KEYWORD.length).split(' ');
    const command = args.shift();

    if (msg.content.startsWith(KEYWORD)) {
        if (command) COMMANDS.get(command)?.callback(msg, args);
    }
});

client.login(process.env.TOKEN);
