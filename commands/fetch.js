const Discord = require('discord.js');
const exec = require('child_process').exec;

module.exports = {
    name: 'fetch',
    description: 'updates bot using git',
    modOnly: true,
    run: (client, msg, args) => {
        // I only added this so that I could update the bot easier.
        // feel free to remove it or modify the git remote.
        
        msg.channel.send('Attempting to fetch latest changes...');
        client.log('Fetching changes');

        exec('git init && git fetch', (stderr, stdout, err) => {
            if (stderr || err) {
                m.edit('Something went wrong while fetching changes. I have sent you the error log.')
                client.log('git fetch failed.', true);
                if (stderr) {
                    msg.author.send('stderr:' + stderr + '\n\nerr:' + err).catch(
                        msg.author.send('The error message had exceeded 2000 characters.')
                    )
                }
            } else {
                msg.channel.send('Sucessfully fetched changes. Exiting... \n\
                    *Please note if you didn\'t run the bot through the startup script it will not automatically reboot.*');
                process.exit(0);
            }
        }) 

    }
}