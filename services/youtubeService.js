// services/youtubeService.js
const axios = require('axios');

// Function to get a YouTube video link based on a mood
const getYouTubeVideo = async (mood) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 1,
        q: `${mood} music`,
        key: process.env.YOUTUBE_API_KEY,
        type: 'video',
      },
    });

    if (response.data.items.length > 0) {
      const video = response.data.items[0];
      return `https://www.youtube.com/watch?v=${video.id.videoId}`;
    }
  } catch (error) {
    console.error('Error fetching video from YouTube:', error);
  }
  return null;
};

module.exports = { getYouTubeVideo };
