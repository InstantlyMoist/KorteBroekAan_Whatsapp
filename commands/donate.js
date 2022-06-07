const profiles = require("../profiles.js")

exports.name = "donate";
exports.description = "Geef broeken weg";

exports.run = async (client, msg, args) => {
    let quotedMessage = await msg.getQuotedMessage();
    if (quotedMessage == null || quotedMessage == undefined) {
        msg.reply("Quote een bericht van iemand die je wilt doneren (Het is geen discord, anders is het vet moeilijk dankjewel)");
        return;
    }
    let quotedProfile = profiles.getProfile(quotedMessage.author);
    let profile = profiles.getProfile(msg.author);

    let amount = parseInt(args[0]);
    if (quotedMessage.author === msg.author) {
        msg.reply("Je kan je eigen profiel niet doneren");
        return;
    }
    if (isNaN(amount)) {
        msg.reply("Je moet een getal opgeven");
        return;
    }
    if (amount < 0) {
        msg.reply("Je kan geen negatieve waarde opgeven");
        return;
    }
    if (amount > profile.coins) {
        msg.reply("Je hebt niet genoeg korte broeken om dit te doen");
        return;
    }

    profiles.addCoins(quotedMessage.author, amount);
    profiles.addCoins(msg.author, -amount);

    msg.reply(`OK, @${quotedMessage.author} heeft nu ${quotedProfile.coins} korte broeken\nJe hebt nog ${profile.coins} korte broeken over`);
};