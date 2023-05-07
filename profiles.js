const fs = require('fs');

if (!fs.existsSync("./data/profiles.json")) {
    fs.writeFileSync("./data/profiles.json", "{}");
}

const profiles = require("./data/profiles.json");


exports.save = () => {
    fs.writeFile("./data/profiles.json", JSON.stringify(profiles, null, 2), (err) => {
        if (err) console.log(err);
    });
}

exports.createProfile = (number) => {
    if (profiles[number]) return;
    profiles[number] = {
        "coins": 50,
        "daily_reward_after": Date.now(),
        "cooldown": Date.now() - 10000,
        "combo": 1
    };
    this.save();
}

exports.getProfile = (number) => {
    number = number.split("@")[0];
    if (!profiles[number]) this.createProfile(number);
    return profiles[number];
}

exports.addCoins = (number, amount) => {
    let profile = this.getProfile(number);
    profile.coins += amount;
    this.save();
}

exports.claimDaily = (number) => {
    let profile = this.getProfile(number);
    if (profile.daily_reward_after > Date.now()) return -1;
    profile.coins += 50;
    profile.daily_reward_after = Date.now() + 86400000;
    this.save();
    return profile.coins;
}

exports.updateCooldown = (number) => {
    let profile = this.getProfile(number);
    profile.cooldown = Date.now() + 10000;
    this.save();
}

exports.updateCombo = (number, won) => {
    let profile = this.getProfile(number);
    if (won) profile.combo++;
    else profile.combo = 1;
    this.save();
    return profile.combo;
}