# Megathonk
![banner](https://cdn.discordapp.com/attachments/507717950686363654/593948941423476748/Untitled-2.png)

*this was my submission for Discord Hack Week 2019*

Everyone loves the news. But what do you do when there's no more news? Well, you turn to this bot! MegaThonk uses Andrej Karpathy's [char-rnn](https://github.com/karpathy/char-rnn) to generate (poorly made) news articles, at the press of 10 buttons and a wait of 5 - 15 seconds! Interested? Check out its website [here](https://megathonk.parm.dev), where you can invite it to your server!

## Installation / Selfhosting

If you're feeling like a big boy, you can take a shot at selfhosting this... monster.

### Torch 

(Credit to Andrej for the torch/char-rnn section)

If you're on Ubuntu, installing torch should look something like

```
$ curl -s https://raw.githubusercontent.com/torch/ezinstall/master/install-deps | bash
$ git clone https://github.com/torch/distro.git ~/torch --recursive
$ cd ~/torch; 
$ ./install.sh      # and enter "yes" at the end to modify your bashrc
$ source ~/.bashrc
```

Once that's done, you'll need to install the Luarocks packages `nngraph`, `optim`, and `nn`.

```
$ luarocks install nngraph 
$ luarocks install optim
$ luarocks install nn
```

Now just git clone the char-rnn repo. I personally prefer to do it in the torch folder, but you can do it wherever you please.

```
$ cd torch
$ git clone https://github.com/karpathy/char-rnn.git
```

### The bot

To start, you'll need Node.js and npm:

```
$ sudo apt install nodejs
$ sudo apt install npm
```

Clone the repository and run npm install:

```
$ git clone https://github.com/ParmesanLinguine/megathonk.git && cd megathonk
$ npm install
```

### Config

You'll need to set `directory` and `checkpoint` to a checkpoint. The bot is configured to use checkpoint.t7, which can be downloaded [here](https://megathonk.parm.dev/checkpoint.t7). Simply drag it into your bot installation directory and you're good to go!

Before you run it, you will also need to make a tokens.json file and put your token in it. If you don't know how to get a token [this](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) should help.

```
{
    "discord": "NTk..."
}
```
Now, all you have to do is start the bot! Congratulations, you've done it!