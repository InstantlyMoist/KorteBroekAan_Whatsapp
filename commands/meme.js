const axios = require('axios');

let MessageMedia;

exports.name = "meme";
exports.description = "Sends a meme";

exports.run = async (client, msg, args) => {
    MessageMedia = client.messagemedia;

    const json = await getMemeJson();
    const buffer = await getImageAsBuffer(json.url);
    const extension = json.url.split('.').pop();

    var mm = new MessageMedia(`image/${extension}`, buffer);
    client.sendMessage(msg.from, mm, { caption: `${json.title}\n\nBron: ${json.postLink}\nr/${json.subreddit}\n⬆️${json.ups}` });
    
}

getMemeJson = async () => {
    const response = await axios.get('https://meme-api.herokuapp.com/gimme');
    const json = response.data;
    return json;
}

getImageAsBuffer = async (url) => {
    const response = await axios.get(url,  { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary').toString('base64');
    return buffer;
}