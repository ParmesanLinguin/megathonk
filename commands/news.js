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
        // send a message and store it for later
        const m = msg.channel.send(`Hold on a sec ${msg.author.name}, we're getting some breaking news...`)
        const motto = client.config.mottos[Math.floor(Math.random()*client.config.mottos.length)];
        // declare a variable named 'primetext'
        let primetext;
        if (args) {
            primetext = `-primetext "${args.join(' ')} "`
        }

        exec(`cd ${client.config.directory} && th sample.lua -length 1000 -gpuid -1 -seed ${Math.floor(Math.random() * 295838)} ${primetext} ${client.config.checkpoint}`, (err, stdout, stderr) => {
            if (stderr != null || err != null) {
                return client.log('oof', true);
            }
            // edit the original message with a new Rich Embed
            m.edit(new Discord.RichEmbed()
                // set its title to 'BREAKING NEWS'
                .setTitle('BREAKING NEWS!')
                // set its description to the output of the execution
                .setDescription(stdout.replace(/(.*?--------------------------)/gs))
                // set its timestamp to the current date
                .setTimestamp(Date.now())
                // set its footer to MegaThonk News Network with a random motto
                .setFooter('MegaThonk News Network - ' + motto)
            )
            
        }); // closing brace, closing parenthesis, and semicolon
    // closing brace
    }
}