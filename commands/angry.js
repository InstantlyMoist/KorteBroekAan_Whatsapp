const c = require('canvas');

exports.name = "angry";
exports.description = "make someone angry";

exports.run = async (client, msg, args) => {
    let quotedMessage = await msg.getQuotedMessage();
    if (quotedMessage == null || quotedMessage == undefined) {
        msg.reply("Quote een bericht.");
        return;
    }
    const message = quotedMessage.body;

    const mock = await getAngryBuffer(message);
    let mm = new client.messagemedia("image/jpg", mock.canvas.toString('base64'));
    client.sendMessage(msg.from, mm, {caption: mock.text});
}

getAngryBuffer = async (text) => {
    const canvas = c.createCanvas(603, 550);
    const ctx = canvas.getContext('2d');

    c.registerFont('./assets/impact.ttf', {family: 'Impact'});
    ctx.font = '64px Impact'

    const msb = await c.loadImage('./assets/angry.jpeg');

    ctx.drawImage(msb, 0, 0, 603, 550);

    let textSize = ctx.measureText(text);
    
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#000000";

    ctx.fillText(text, 301 - textSize.width / 2, 70);
    ctx.strokeText(text,  301 - textSize.width / 2, 70);

    return {text: text, canvas: canvas.toBuffer("image/jpeg")};
}