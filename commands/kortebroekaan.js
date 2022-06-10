const fs = require("fs");
const shortpants = require("shortpants");

exports.name = "kortebroekaan";
exports.description = "Laat zien of je een korte broek aan kunt";

exports.run = async (client, msg, args) =>  {
    // Get current time in milliseconds
    let now = new Date().getTime();
    MessageMedia = client.messagemedia;
    if (args.length == 0) {
        msg.reply("Voeg een plaats toe om te kijken of je een korte broek aan kunt");
        return;
    }
    let location = args.join(" ");
    let day = 1;

    if (location.includes("morgen")) { // vies stukje code maarja...
        day = 2;
        location = location.replace("morgen", "");
    }
    if (location.includes("overmorgen")) {
        day = 3;
        location = location.replace("over", "");
        location = location.replace("overmorgen", "");
    }


    
    const response = await shortpants.weather.getShortPantsFromWeather({
        location: location,
        day: day - 1,
        apiKey: process.env.WEATHER_API_KEY,
    });
    const image = await shortpants.image.createImage(response);

    var imageAsBase64 = Buffer.from(image.buffer).toString("base64");
    var mm = new MessageMedia("image/jpg", imageAsBase64);

    let finalString = "Kan ik vandaag een korte broek aan?\n";

    if (response.rainChance == undefined || response.temperature == undefined) {
        finalString += `De locatie ${response.location} konden we helaas niet inladen vandaag...\n\n`;
    } else {
        finalString += `In ${response.location} is er een regenkans van ${response.rainChance}% met een temperatuur van ${response.temperature}°C. Hier kan je vandaag ${response.canWearShortPants ? "een" : "geen"} korte broek aan!\n\n`;
    }

    let end = new Date().getTime() - now;

    finalString += "\nDeze informatie is opgehaald in " + end + "ms";

    finalString += "\nDeel dit bericht met je vrienden en join onze groepsapp: https://chat.whatsapp.com/EqTygiIr1iQ5sEzA1rh7nl"

    client.sendMessage(msg.from, mm, { caption: finalString });
}