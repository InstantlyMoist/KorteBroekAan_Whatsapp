const profiles = require("../profiles.js");

exports.name = "profile";
exports.description = "Bekijk je profiel";

exports.run = (client, msg, args) => {
    const profile = profiles.getProfile(msg.author);
    let answer = `Je hebt momenteel ${profile.coins} korte broeken\nJe kunt je daily reward krijgen op ${new Date(profile.daily_reward_after).toLocaleString()}`;

    msg.reply(answer);
}