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
  RAM: 'French House, House, Electronic, dance, disco',
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
  const genre = moodToGenreMap[mood.toLowerCase()] || 'pop'; // Default to 'pop' if the mood is not in the map
  const token = await getSpotifyToken();
  if (!token) return null;

  try {
    const response = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        seed_genres: genre,
        limit: 1,
      },
    });

    if (response.data.tracks.length > 0) {
      return response.data.tracks[0];
    } else {
      console.error('No tracks found for the specified mood:', mood);
      return null;
    }
  } catch (error) {
    console.error('Error fetching track from Spotify:', error.response ? error.response.data : error.message);
    return null;
  }
};

// Function to get a random Daft Punk track from Spotify (specifically for secretmood command)
const getDaftPunkTrack = async () => {
  const token = await getSpotifyToken();
  if (!token) return null;

  try {
    // Search for Daft Punk tracks using the Spotify Search API
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: 'Daft Punk',
        type: 'track',
        limit: 50, // Get up to 50 tracks to choose from
      },
    });

    if (response.data.tracks.items.length > 0) {
      // Select a random Daft Punk track from the returned items
      const randomIndex = Math.floor(Math.random() * response.data.tracks.items.length);
      const track = response.data.tracks.items[randomIndex];
      const songTitle = track.name;
      const albumName = track.album.name;
      const artistName = track.artists.map(artist => artist.name).join(', ');
      const url = track.external_urls.spotify; // Spotify URL for the track
      const albumArt = track.album.images.length > 0 ? track.album.images[0].url : null; // Get album art URL

      // Return structured track details, including the album art URL
      return { songTitle, albumName, artistName, url, albumArt };
    } else {
      console.error('No Daft Punk tracks found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching Daft Punk track from Spotify:', error.response ? error.response.data : error.message);
    return null;
  }
};

// Export both functions for use in commands
module.exports = { getSpotifyTrack, getDaftPunkTrack };
