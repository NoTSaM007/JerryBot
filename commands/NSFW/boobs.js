const Images = require("dabi-images");
const Client = new Images.Client();
const Discord = require("discord.js");

// Boobs command
module.exports = {
	name: 'boobs',
	description: 'Post an image of boobs (Must be in NSFW channel).',
    execute(message) 
    {
        // Check to see if command was sent in NSFW channel
        if(!message.channel.nsfw)
            message.channel.send("Must be in a NSFW channel.");
        else
        {
            // Fetch boobs image
            Client.nsfw.real.boobs().then(json => {
                /* Discord does not currently support embedding videos, If one day they do support embedding videos, this code will work
                if(json.is_video)
                {
                    const embed = new Discord.MessageEmbed()
                        .setImage(json.url)
                        .setColor("RANDOM")
                        .setURL(json.url)
                        .setAuthor(json.url);
                        
                    return message.channel.send({embed});
                }
                */
               if(json.url.includes("gfycat"))
               {
                  var link = json.url.replace("gfycat", "gifdeliverynetwork");
                  if(link.includes("/gifs/detail"))
                    link = link.replace("/gifs/detail", "");
                  return message.channel.send(link);
               }

                return message.channel.send(json.url);
                }).catch(error => {
                    message.channel.send("Unable to fetch image. Please try again.");
                    console.log(error);
                });
        }
    },
};