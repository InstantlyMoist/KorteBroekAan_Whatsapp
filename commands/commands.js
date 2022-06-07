exports.name = "commands";
exports.description = "Gives you this list of commands.";

exports.run = (client, msg, args) => {
    let finalString = "*Commands:*\n";
    client.commands.forEach((command) => {
        finalString += `_${command.name}_ : ${command.description}\n`
    });
    msg.reply(finalString.trim());
};