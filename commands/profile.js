const profiles = require("../profiles.js");

exports.name = "profile";
exports.description = "Bekijk je profiel";

exports.run = (client, msg, args) => {
    let profile = profiles.getProfile(msg.author);
    if (args.length > 0) {
        let user = args[0];
        user = user.replace("@", "");
        user += "@c.us"

            profile = profiles.getProfile(user);
            msg.reply(`${args[0]} heeft ${profile.coins} korte broeken`);
            return;
    }
    
    let answer = `Je hebt momenteel ${profile.coins} korte broeken\nJe kunt je daily reward krijgen op ${new Date(profile.daily_reward_after).toLocaleString()}`;

    msg.reply(answer);
}