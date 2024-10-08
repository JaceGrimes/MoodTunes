// commands/general/help.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays a list of available commands.'),
  
  async execute(interaction) {
    // Create an embedded message with rich formatting
    const helpEmbed = new EmbedBuilder()
      .setColor(0x00FF00) // You can change this color to any hexadecimal color value
      .setTitle('🎵 MoodTunes Bot Help Menu 🎵')
      .setDescription('Here is a list of commands you can use with MoodTunes. Enjoy the music and have fun!')
      .setThumbnail(interaction.client.user.displayAvatarURL({ format: 'png', dynamic: true })) // Set bot's avatar as the thumbnail
      .addFields(
        { name: '/help', value: 'Displays this help message.', inline: true },
        { name: '/mood [mood]', value: 'Recommends a Spotify song based on the specified mood.', inline: true },
        { name: '/ytmood [mood]', value: 'Recommends a YouTube music video based on the specified mood.', inline: true },
        { name: '/ping', value: 'Replies with "Pong!" to test if the bot is working.', inline: true },
        { name: '/hello', value: 'Greets the user with a witty response.', inline: true },
        { name: '/invite', value: 'Generates an invite link for the bot to be added to other servers.', inline: true }
      )
      .setFooter({ text: 'MoodTunes Bot | Created with ❤️ for music lovers!', iconURL: interaction.client.user.displayAvatarURL({ format: 'png' }) })
      .setTimestamp(); // Adds the current timestamp to the footer

    // Send the rich embed as a response to the command
    await interaction.reply({ embeds: [helpEmbed] });
  },
};
