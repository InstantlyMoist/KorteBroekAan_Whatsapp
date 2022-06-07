let axios = require('axios');

exports.name = "dolan";
exports.description = "Stuurt text in dolan speak terug (English only)";

exports.run = async (client, msg, args) => {
    if (args.length == 0) {
        msg.reply("pls giv argument");
        return;
    }
    let toTranslate = args.join("%20");
    let response = await axios.get(`https://dolan.herokuapp.com/translate?text=${toTranslate}`);
    let json = response.data;
    msg.reply(json.contents.translated);
}