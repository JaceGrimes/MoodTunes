// commands/music/ytmood.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getYouTubeVideoDetails } = require('../../services/youtubeService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ytmood')
    .setDescription('Get a YouTube video recommendation based on your mood.')
    .addStringOption(option =>
      option.setName('mood')
        .setDescription('The mood to get a video for (e.g., happy, sad, chill)')
        .setRequired(true)),

  async execute(interaction) {
    const mood = interaction.options.getString('mood');

    try {
      // Get the YouTube video details based on the provided mood
      const videoDetails = await getYouTubeVideoDetails(mood);

      if (videoDetails) {
        // Destructure the details from the response
        const { title, channelTitle, url, videoId, description } = videoDetails;

        // Create a rich embed message with detailed video information
        const videoEmbed = new EmbedBuilder()
          .setColor(0xFF0000) // YouTube red color
          .setTitle(`🎥 ${title}`)
          .setURL(url)
          .setDescription(description)
          .addFields(
            { name: 'Channel', value: channelTitle, inline: true },
            { name: 'Mood', value: mood.charAt(0).toUpperCase() + mood.slice(1), inline: true },
            { name: 'Watch', value: `[Watch on YouTube](${url})`, inline: false }
          )
          .setThumbnail(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`) // Use YouTube video thumbnail as image
          .setFooter({
            text: 'MoodTunes Bot | Created with ❤️ for music lovers!',
            iconURL: interaction.client.user.displayAvatarURL({ format: 'png' })
          })
          .setTimestamp();

        // Send the embed with video details as a response
        await interaction.reply({ content: url, embeds: [videoEmbed] });
      } else {
        await interaction.reply(`Sorry, I couldn't find a YouTube video for the mood: **${mood}**.`);
      }
    } catch (error) {
      console.error('Error executing ytmood command:', error.response ? error.response.data : error.message);
      await interaction.reply('An error occurred while fetching the video. Please try again later.');
    }
  },
};
