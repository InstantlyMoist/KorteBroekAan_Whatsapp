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
    if (!profiles[number]) this.createProfile(number);
    return profiles[number];
}

exports.addCoins = (number, amount) => {
    if (!profiles[number]) this.createProfile(number);
    profiles[number].coins += amount;
    this.save();
}

exports.claimDaily = (number) => {
    if (!profiles[number]) this.createProfile(number);
    const profile = profiles[number];
    if (profile.daily_reward_after > Date.now()) return -1;
    profile.coins += 50;
    profile.daily_reward_after = Date.now() + 86400000;
    this.save();
    return profile.coins;
}

exports.updateCooldown = (number) => {
    if (!profiles[number]) this.createProfile(number);
    profiles[number].cooldown = Date.now() + 10000;
    this.save();
}

exports.updateCombo = (number, won) => {
    if (!profiles[number]) this.createProfile(number);
    if (won) profiles[number].combo++;
    else profiles[number].combo = 1;
    this.save();
    return profiles[number].combo;
}