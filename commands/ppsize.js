exports.name = "ppsize";
exports.description = "Na dit commando heb je geen last meer van grootheidswaanzin";

exports.run = (client, msg, args) => {
    let ppLength = "=".repeat(getRandomInt(15)); 
    msg.reply(`*peepee size machine*\nYour penis:\n8${ppLength}D`);

};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}