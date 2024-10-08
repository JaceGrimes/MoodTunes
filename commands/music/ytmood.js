// commands/music/ytmood.js
const { SlashCommandBuilder } = require('discord.js');
const { getYouTubeVideo } = require('../../services/youtubeService');

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
      const videoUrl = await getYouTubeVideo(mood);
      if (videoUrl) {
        await interaction.reply(`Here's a YouTube video that matches your mood (${mood}): ${videoUrl}`);
      } else {
        await interaction.reply(`Sorry, I couldn't find a YouTube video for the mood: ${mood}.`);
      }
    } catch (error) {
      console.error('Error executing ytmood command:', error);
      await interaction.reply('An error occurred while fetching the video. Please try again later.');
    }
  },
};
