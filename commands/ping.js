exports.name = "ping";
exports.description = "Stuurt pong! terug.";

exports.run = (client, msg, args) => {
    msg.reply(`Pong!`);
}