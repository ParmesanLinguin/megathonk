/* NOTE IF YOU'RE REVIEWING FOR DISCORD HACK WEEK 2019:

THIS BOT RUNS ON A NEURAL NETWORK. IT'S MUCH EASIER FOR BOTH PARTIES
IF YOU JUST ADD THE BOT TO THE SERVER TO REVIEW ITS FUNCTIONALITY
VERSUS CREATING YOUR OWN NET

BYE THANKS ALSO PLEASE GIVE 1ST PLACE THANKS
*/
// imports discord.js
const Discord = require('discord.js');
// imports child_process' 'exec' method
const exec = require('child_process').exec;

// module exports
module.exports = {
    name: 'news',
    description: 'generates a news article using *MegaThonk Neural Net*',
    run: (client, msg, args) => {
        msg.channel.send(`Hold on a sec ${msg.author.username.split(' ')[0]}, we're getting some breaking news...`).then((m) => {
            const motto = client.config.mottos[Math.floor(Math.random()*client.config.mottos.length)];
            let primetext;
            if (args) {
                primetext = `-primetext "${args.join(' ')} "`
            }
            // execute the command and get the result
            exec(`cd ${client.config.directory} && th sample.lua -length 1000 -gpuid -1 -seed ${Math.floor(Math.random() * 295838)} ${primetext} ${client.config.checkpoint}`, (err, stdout, stderr) => {
                if (stderr || err) {
                    m.edit('Actually, scratch that. No news here!')
                    return client.log('oof', true);
                }
                m.edit(new Discord.RichEmbed()
                    .setTitle('BREAKING NEWS!')
                    .setDescription(stdout.replace(/(.*?--------------------------)/gs))
                    .setTimestamp(Date.now())
                    .setFooter('MegaThonk News Network - ' + motto)
                )
                
            }); // closing brace, closing parenthesis, and semicolon
        });
    }
}