const profiles = require("../profiles.js");

exports.name = "daily";
exports.description = "Claim je daily reward";

exports.run = (client, msg, args) => {
    const response = profiles.claimDaily(msg.from);
    if (response === -1) {
        msg.reply("Je kunt je daily reward niet claimen op dit moment");
        return;
    }

    msg.reply(`Daily reward succesvol gekregen! Je hebt nu ${response} korte broeken`);
}