const Search = require('random-puppy');

module.exports = {
	name: 'butts',
	description: 'Post an image of a butt (Must be in NSFW channel).',
	async execute(message) {
        if(!message.channel.nsfw)
            message.channel.send("Must be in a NSFW channel.");
        else
        {
            try
            {
                let subreddits = ["ass", "CuteLittleButts", "reversecowgirl",
                "facedownassup", "butt", "butts", "cosplaybutts", "girlsinyogapants", 
                "smalltitsbigass", "CelebrityButts", "booty", "NSFW_Pussy_Teen_Ass", "nsfw_college_ass",
                "beautiful_asses", "AsianAss", "cheekyasian", "ThatPerfectAss", "Top_Tier_Asses", "WhiteCheeks",
                "ASSians", "cuteAssCuterface", "AsianAsses", "CuteLittleButts", "brunetteass", "Blondeass", "Redheadass", "beautifulbutt"];
                
                var sub = subreddits[Math.floor(Math.random() * subreddits.length)];
                
                const image = Search(sub);
                message.channel.send(image); 
            }

            catch (error)
            {
                console.log(error);
                message.channel.send("There was an issue fetching a butt pic.");
            }
        }
	},
};