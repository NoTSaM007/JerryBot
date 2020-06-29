const Attachment = require('discord.js'); // Needed to send hangman images
const random_word = require('random-words'); // Needed to create new word when player wins or loses
const Hangman = require('../../classes/Hangman');

// Hangman command
module.exports = {
	name: 'hangman',
	description: 'Play hangman game.',
    execute(message) 
    {
        const hangman = new Hangman();

        // Get letter used after !hangman command
        const args = message.content.split(" ");
        const letter = args[1].charAt(0);
        const word = hangman.get_word();

        // If letter guessed is in word
        if(word.includes(letter))
        {
            // Add letters guessed correctly to array 
            hangman.add_letter(letter);

            // Output picture of current state of hangman game
            message.channel.send({files: [`../../images/hangman_${hangman.strikes}.png`]});

            // Output current state of game
            var i = 0;
            var str = "";
            for(i = 0; i < hangman.get_word_length(); i++)
            {
                if(hangman.get_letters().includes(word.charAt(i)))
                {
                    str += `${letter} `;
                    hangman.add_hit();
                }
                else
                {
                    str += "- ";
                }
            }

            message.channel.send(str);

            // Check to see if player won
            if(hangman.get_hits() == hangman.get_word_length())
            {
                message.channel.send("**YOU WIN!**");
                hangman.new_word();
            }
        }

        // If letter guessed is not in word
        else
        {
            // Add one to letters incorrectly guessed
            hangman.add_strike();

            // Output picture of current state of hangman game
            message.channel.send({files: [`../../images/hangman_${hangman.strikes}.png`]});

            // Output current state of game
            var i = 0;
            var str = "";
            for(i = 0; i < hangman.get_word_length(); i++)
            {
                if(hangman.get_letters().includes(word.charAt(i)))
                {
                    str += `${letter} `;
                    hangman.add_hit();
                }
                else
                {
                    str += '- ';
                }
            }

            message.channel.send(str);

            // Check to see if player lost
            if(hangman.get_strikes() == 6)
            {
                message.channel.send("**HAHAHAHA YOU LOST DUMBASS!**");
                hangman.new_word();
            }
        }
    },
};