const profiles = require("../profiles.js");

exports.name = "coinflip";
exports.description = "Flip een muntje op goed geluk";

exports.run = (client, msg, args) => {
    const profile = profiles.getProfile(msg.author ?? msg.from);
    if (msg.author != undefined) {
        msg.reply("Dit commando werkt alleen maar in prive chats");
        return;
    }
    if (args[0] !== "heads" && args[0] !== "tails") {
        msg.reply("Je moet heads of tails opgeven\nVoorbeeld: !coinflip heads 50");
        return;
    }
    if (isNaN(args[1])) {
        msg.reply("Je moet een getal opgeven\nVoorbeeld: !coinflip heads 50");
        return;
    }
    let bet = parseInt(args[1]);
    if (bet > profile.coins) {
        msg.reply("Je hebt niet genoeg korte broeken om dit te doen");
        return;
    }
    if (bet <= 0) {
        msg.reply("Voer een geldig getal in");
        return;
    }
    let result = Math.random() < 0.5 ? "heads" : "tails";
    const won = result === args[0];
    const combo = profiles.updateCombo(msg.author ?? msg.from , won);
    profiles.addCoins(msg.author ?? msg.from, won ? bet * combo : -bet);
    msg.reply(`Je hebt ${won ? "gewonnen" : "verloren"}!\nJe hebt nu ${profile.coins} korte broeken\nJe hebt ${combo}x gewonnen op een rij`);
}