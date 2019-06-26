const Discord = require('discord.js')

module.exports = {
    name: 'info',
    description: 'basic info about the bot',
    run: (client, msg, args) => {
        const totalSeconds = process.uptime();
        const secs = Math.floor(totalSeconds % 60);
        const days = Math.floor((totalSeconds % 31536000) / 86400);
        const hours = Math.floor((totalSeconds / 3600) % 24);
        const mins = Math.floor((totalSeconds / 60) % 60);
        msg.channel.send(new Discord.RichEmbed()
            .setTitle('Megathonk')
            .setDescription('A bot for [Discord Hack Week 2019](https://blog.discordapp.com/discord-community-hack-week-build-and-create-alongside-us-6b2a7b7bba33)')
            .addField('Uptime', `${days == 1 ? '1 day,' : days > 0 ? `${days} days,` : ''} ${hours == 1 ? '1 hour,' : hours > 0 || days > 0 ? `${hours} hours,` : ''} ${mins == 1 ? '1 minute,' : days > 0 || hours > 0 || mins > 0 ? `${mins} minutes,` : ''} ${secs == 1 ? '1 secs' : `${secs} seconds`}`, true)
            .addField('Version', client.config.version, true)
            .addField('Libraries', 'discord.js@11.5.1', true)
            .addField('GitHub', '[Click Here](https://github.com/parmesanlinguine/megathonk.git)', true)
        );
    }
}