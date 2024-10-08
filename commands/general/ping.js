// commands/general/ping.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong and additional bot information.'),

  async execute(interaction) {
    // Get bot's ping/latency information
    const latency = Date.now() - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);

    // Create a rich embed message
    const pingEmbed = new EmbedBuilder()
      .setColor(0x3498db) // Set the color of the embed (Blue in this case)
      .setTitle('🏓 Pong!')
      .setDescription('Here are some technical details:')
      .addFields(
        { name: 'Latency', value: `${latency}ms`, inline: true },
        { name: 'API Latency', value: `${apiLatency}ms`, inline: true },
        { name: 'Uptime', value: `${Math.floor(interaction.client.uptime / (1000 * 60))} minutes`, inline: true },
      )
      .setThumbnail(interaction.client.user.displayAvatarURL({ format: 'png', dynamic: true })) // Bot's avatar as thumbnail
      .setFooter({ 
        text: 'MoodTunes Bot | Created with ❤️ for music lovers!', 
        iconURL: interaction.client.user.displayAvatarURL({ format: 'png' }) 
      })
      .setTimestamp(); // Add a timestamp for the message

    // Send the rich embed as a response to the interaction
    await interaction.reply({ embeds: [pingEmbed] });
  },
};
