const c = require('canvas');

exports.name = "mock";
exports.description = "Mocks a quoted message";

exports.run = async (client, msg, args) => {
    let quotedMessage = await msg.getQuotedMessage();
    if (quotedMessage == null || quotedMessage == undefined) {
        msg.reply("Quote een bericht.");
        return;
    }
    const message = quotedMessage.body;

    const mock = await getMockBuffer(message);
    let mm = new client.messagemedia("image/jpg", mock.canvas.toString('base64'));
    client.sendMessage(msg.from, mm, {caption: mock.text});
}

getMockBuffer = async (text) => {
    const canvas = c.createCanvas(1200, 800);
    const ctx = canvas.getContext('2d');

    c.registerFont('./assets/impact.ttf', {family: 'Impact'});
    ctx.font = '64px Impact'

    text = randomize(text);

    const msb = await c.loadImage('./assets/msb.jpg');

    ctx.drawImage(msb, 0, 0, 1200, 800);

    let textSize = ctx.measureText(text);
    
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#000000";

    ctx.fillText(text, 600 - textSize.width / 2, 70);
    ctx.strokeText(text,  600 - textSize.width / 2, 70);

    return {text: text, canvas: canvas.toBuffer("image/jpeg")};
}

randomize = (text) => {
    let newText = "";
    for (let i = 0; i < text.length; i++) newText += Math.random() > 0.5 ? text[i].toUpperCase() : text[i].toLowerCase();
    return newText;
}