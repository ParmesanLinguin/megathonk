/* IF YOU ARE USING THIS BOT TEMPLATE

The bot template allows errors to be passed back to the command file itself.

Here's a complete list of errors, and when they are called.

    - lessArgs --- The number of arguments supplied with the message is LESS than command.args OR command.args.min specifies
        - passes (msg, args.length)
    - moreArgs --- The number of arguments supplied with the message is MORE than command.args OR command.args.max specifies
        - passes (msg, args.length)
    - wrongType --- The type of channel this message was sent in is not allowed by command.types
        - passes (msg, msg.channel.type)
    - failedExecution --- General function called when the command (or message handler sorry) had an error
        - passes (msg, error)


*/

const Discord = require('discord.js');

module.exports = (client, msg) => {
    // if message is by a bot, return
    if (msg.author.bot) return;

    const prefix = client.config.prefix;

    // if the message doesn't include the prefix at the start, return
    console.log(msg.content)
    if (msg.content.toLowerCase().indexOf(prefix) != 0) return;

    // find the arguments of the message
    const args = msg.content.slice(prefix.length).split(/ +/);

    // find the name of the command (first argument)
    const commandName = args.shift().toLowerCase();

    // check if the command exists
    const command = client.commands.get(commandName)

    // throw out any invalid commands
    if (!command) return;

    // throw out command if it doesn't match channel type
    if (command.types && !command.types.includes(msg.channel.type)) {
        if (command.errors && command.errors.includes(wrongType) && typeof command.errors.wrongType == 'function') {
            return command.errors.wrongType(msg, msg.channel.type);
        } else return;
    }

    // too few args handler
    if (command.args && command.args.min && args.length < command.args.min || command.args && args.length < command.args) {
        if (command.errors && command.errors.includes(lessArgs) && typeof command.errors.lessArgs == 'function') {
            return command.errors.lessArgs(msg, args.length)
        } else return;
    }

    // too many args handler
    if (command.args && command.args.max && args.length > command.args.max || command.args && args.length < command.args) {
        if (command.errors && command.errors.includes(manyArgs) && typeof command.errors.manyArgs == 'function') {
            return command.errors.manyArgs(msg, args.length)
        } else return;
    }

    try {
        command.run(client, msg, args);
        client.log(`${msg.author.tag} executed ${command.name}. Raw text:\n${msg.content}`)
    } catch (e) {
        if (command.errors && command.errors.includes(failedExecution) && typeof command.errors.failedExecution == 'function') {
            return command.errors.failedExecution(msg, e)
        } else return;
    }
}

// by Parmesan Linguine#0001
// You can do whatever you'd like with this code.