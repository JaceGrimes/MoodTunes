// services/spotifyService.js
const axios = require('axios');

// Mood to Genre Mapping
const moodToGenreMap = {
  happy: 'pop',
  sad: 'blues',
  chill: 'chill',
  energetic: 'dance',
  calm: 'acoustic',
  angry: 'metal',
  romantic: 'romance',
  focused: 'study',
  motivated: 'work-out',
  excited: 'party',
};

// Function to get a Spotify access token
const getSpotifyToken = async () => {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      },
      params: {
        grant_type: 'client_credentials',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Spotify token:', error.response ? error.response.data : error.message);
    return null;
  }
};

// Function to get a Spotify track based on mood
const getSpotifyTrack = async (mood) => {
  // Use the moodToGenreMap to get a valid genre for the given mood
  const genre = moodToGenreMap[mood.toLowerCase()] || 'pop'; // Default to 'pop' if the mood is not in the map

  // Get an access token first
  const token = await getSpotifyToken();
  if (!token) return null;

  try {
    const response = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        seed_genres: genre, // Use the mapped genre instead of the raw mood
        limit: 1, // Return only one track for simplicity
      },
    });

    // Check if there are tracks in the response
    if (response.data.tracks.length > 0) {
      return response.data.tracks[0]; // Return the first track
    } else {
      console.error('No tracks found for the specified mood:', mood);
      return null;
    }
  } catch (error) {
    console.error('Error fetching track from Spotify:', error.response ? error.response.data : error.message);
    return null;
  }
};

module.exports = { getSpotifyTrack };
