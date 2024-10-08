// services/youtubeService.js
const axios = require('axios');

// Function to get detailed YouTube video information based on mood
const getYouTubeVideoDetails = async (mood) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.error('Error: YouTube API Key is missing. Please set it in the environment variables.');
      return null;
    }

    // Request to get multiple video details based on mood
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 10, // Increase the number of results to get more variety
        q: `${mood} music`,
        key: apiKey,
        type: 'video',
        order: 'relevance', // Order by relevance, you can change to 'viewCount', 'rating', or 'date'
        videoCategoryId: '10' // Music category (YouTube video category ID for music)
      },
    });

    // Check if any items are returned
    if (response.data.items.length > 0) {
      // Select a random video from the list of returned items
      const randomIndex = Math.floor(Math.random() * response.data.items.length);
      const video = response.data.items[randomIndex];
      const videoId = video.id.videoId;
      const title = video.snippet.title;
      const channelTitle = video.snippet.channelTitle;
      const description = video.snippet.description;
      const url = `https://www.youtube.com/watch?v=${videoId}`;

      // Return a structured object with all relevant details
      return { title, channelTitle, description, url, videoId };
    }
  } catch (error) {
    console.error('Error fetching video details from YouTube:', error.response ? error.response.data : error.message);
  }
  return null;
};

module.exports = { getYouTubeVideoDetails };
