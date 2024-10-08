// commands/general/invite.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Generates an invite link for the bot.'),

  async execute(interaction) {
    // Get the bot's client ID from the environment variables
    const clientId = process.env.CLIENT_ID;

    // Check if the clientId is defined
    if (!clientId) {
      return interaction.reply('Error: Bot client ID is not set in the environment variables.');
    }

    // Define the permissions the bot requires (set to admin permissions by default)
    const permissions = 8; // 8 represents "Administrator" permission
    const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot%20applications.commands&permissions=${permissions}`;

    // Create a rich embed message for the invite link
    const inviteEmbed = new EmbedBuilder()
      .setColor(0x1abc9c) // Set the embed color (a shade of green)
      .setTitle('🤖 Invite MoodTunes Bot to Your Server!')
      .setDescription(
        `Click the link below to invite **MoodTunes** to your server:\n\n[Invite Link](${inviteUrl})`
      )
      .addFields(
        { name: 'Permissions', value: 'Administrator (All permissions)', inline: true },
        { name: 'Scope', value: 'bot, applications.commands', inline: true },
        { name: 'Client ID', value: clientId, inline: true }
      )
      .setThumbnail(interaction.client.user.displayAvatarURL({ format: 'png', dynamic: true })) // Bot's avatar as thumbnail
      .setFooter({ 
        text: 'MoodTunes Bot | Created with ❤️ for music lovers!', 
        iconURL: interaction.client.user.displayAvatarURL({ format: 'png' }) 
      })
      .setTimestamp(); // Add a timestamp for the message

    // Send the rich embed as a response to the command
    await interaction.reply({ embeds: [inviteEmbed] });
  },
};
