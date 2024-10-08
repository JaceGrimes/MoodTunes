// commands/music/mood.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getSpotifyTrack } = require('../../services/spotifyService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mood')
    .setDescription('Get a Spotify song recommendation based on your mood.')
    .addStringOption(option =>
      option.setName('mood')
        .setDescription('The mood to get a song for (e.g., happy, sad, chill)')
        .setRequired(true)),

  async execute(interaction) {
    const mood = interaction.options.getString('mood');

    try {
      // Get the Spotify track recommendation based on the mood
      const track = await getSpotifyTrack(mood);

      if (track) {
        // Extract the track details
        const songTitle = track.name;
        const albumName = track.album.name;
        const artistName = track.artists.map(artist => artist.name).join(', ');
        const url = track.external_urls.spotify; // Spotify URL for the track
        const albumArt = track.album.images.length > 0 ? track.album.images[0].url : 'https://i.imgur.com/9L9Tz0b.png'; // Use album image as thumbnail if available, else fallback image

        // Create a rich embed message with track details
        const trackEmbed = new EmbedBuilder()
          .setColor(0x1DB954) // Spotify Green color
          .setTitle(`🎵 Mood-Based Song Recommendation: ${mood.charAt(0).toUpperCase() + mood.slice(1)}`)
          .setDescription(`Here's a song that matches the **${mood}** mood!`)
          .setThumbnail(albumArt) // Use album art as thumbnail
          .addFields(
            { name: '🎶 Track Name', value: songTitle, inline: true },
            { name: '🎤 Artist(s)', value: artistName, inline: true },
            { name: '💿 Album', value: albumName, inline: true },
            { name: '🔗 Spotify Link', value: `[Listen on Spotify](${url})`, inline: false }
          )
          .setFooter({ text: 'MoodTunes Bot | Powered by Spotify', iconURL: interaction.client.user.displayAvatarURL({ format: 'png' }) })
          .setTimestamp();

        // Send the rich embed as a response
        await interaction.reply({ embeds: [trackEmbed] });
      } else {
        await interaction.reply(`Sorry, I couldn't find a song for the mood: **${mood}**.`);
      }
    } catch (error) {
      console.error('Error executing mood command:', error);
      await interaction.reply('An error occurred while fetching the song. Please try again later.');
    }
  },
};
