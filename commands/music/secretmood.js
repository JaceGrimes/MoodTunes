// commands/music/secretmood.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getDaftPunkTrack } = require('../../services/spotifyService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('secretmood')
    .setDescription('Shhh... this secret command will recommend a random Daft Punk song.'),

  async execute(interaction) {
    try {
      // Get a random Daft Punk track from Spotify
      const track = await getDaftPunkTrack();

      if (track) {
        // Destructure the track details
        const { songTitle, albumName, artistName, url, albumArt } = track;

        // Create an embed with the track information and album art
        const trackEmbed = new EmbedBuilder()
          .setColor(0x1DB954) // Spotify green color
          .setTitle(`🎵 ${songTitle}`)
          .setURL(url)
          .setDescription(`Here's a secret Daft Punk song for you!`)
          .addFields(
            { name: 'Artist', value: artistName, inline: true },
            { name: 'Album', value: albumName, inline: true },
            { name: 'Listen on Spotify', value: `[Click here to listen!](${url})`, inline: false }
          )
          .setThumbnail(albumArt || 'https://upload.wikimedia.org/wikipedia/en/a/ae/Daft_Punk_logo.svg') // Use album art as thumbnail if available
          .setFooter({
            text: 'MoodTunes Bot | Enjoy the beats of Daft Punk!',
            iconURL: interaction.client.user.displayAvatarURL({ format: 'png' })
          })
          .setTimestamp();

        // Send the embed with the Daft Punk track details
        await interaction.reply({ embeds: [trackEmbed] });
      } else {
        await interaction.reply('Sorry, I couldn’t find any Daft Punk songs at the moment. Please try again later.');
      }
    } catch (error) {
      console.error('Error executing secretmood command:', error.response ? error.response.data : error.message);
      await interaction.reply('An error occurred while fetching the Daft Punk song. Please try again later.');
    }
  },
};
