const Discord = require('discord.js')
const client = new Discord.Client();

const log = (message, warn = false) => {
    console.log(`[${ new Date().toLocaleString() }] ${warn ? '!' : '?'} ${message}`);
}

const tokens = require('./tokens.json');
const config = require('./config.json');

client.commands = new Discord.Collection();
client.config = config;
client.log = log;

// load commands

for (const file of require('fs').readdirSync('./commands')) {
    if (file.endsWith('.js')) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command)
    }
}

// load events sike i can just do this manually lmao
const message = require('./events/message');
client.on('message', message.bind(null, client));
delete require.cache[require.resolve('./events/message')];


// apparently this'll stop d.js from crashing all together if something goes wrong
// but i don't know so don't quote me on it
client.on('error', () => {});
client.on('ready', () => {
    client.user.setPresence({game: {type: 3, name: 'MNN'}});
});

client.login(tokens.discord)
