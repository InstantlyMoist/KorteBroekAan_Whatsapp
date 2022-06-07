require("dotenv").config(); 

const fs = require('fs');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const Enmap = require('enmap');
const profiles = require('./profiles.js');

const whatsappClient = new Client({
    authTimeoutMs: 900000,
    puppeteer: { headless: true , args: ['--no-sandbox', '--disable-setuid-sandbox'] },
    authStrategy: new LocalAuth({dataPath: './data/auth'}),
});

whatsappClient.commands = new Enmap();
whatsappClient.messagemedia = MessageMedia;

whatsappClient.initialize();

fs.readdir(__dirname + "/commands", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(__dirname + "/commands/" + file);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        whatsappClient.commands.set(commandName, props);
    });
});

whatsappClient.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});

whatsappClient.on('authenticated', () => {
    console.log('Client is authenticated!');
});

whatsappClient.on('message', async msg => {
    const args = msg.body.slice('!'.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();
    const cmd = whatsappClient.commands.get(command);
    if (!cmd) return;
    if (profiles.getProfile(msg.author).cooldown > Date.now()) {
        const cooldown = profiles.getProfile(msg.author).cooldown - Date.now();
        msg.reply(`Je moet nog ${cooldown/1000}s wachten om je commando opnieuw te kunnen uitvoeren`);
        return;
    }
    profiles.updateCooldown(msg.author);
    cmd.run(whatsappClient, msg, args);
});


