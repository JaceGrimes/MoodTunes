// Import required modules
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Spotify and YouTube credentials
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Authenticate with Spotify API
let spotifyToken = '';
const authenticateSpotify = async () => {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      },
      params: {
        grant_type: 'client_credentials',
      },
    });
    spotifyToken = response.data.access_token;
  } catch (error) {
    console.error('Error authenticating with Spotify:', error);
  }
};

// Ready event - This will run when the bot is logged in and ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  authenticateSpotify(); // Authenticate with Spotify when bot is ready
});

// Command Handling
client.on('messageCreate', async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Mood-based song recommendation
  if (message.content.startsWith('!mood')) {
    const mood = message.content.split(' ')[1]?.toLowerCase();

    if (mood) {
      const spotifyTrack = await getSpotifyTrack(mood);
      if (spotifyTrack) {
        message.channel.send(`Here's a song that matches your mood (${mood}): ${spotifyTrack}`);
      } else {
        message.channel.send(`Sorry, I couldn't find a song for the mood: ${mood}.`);
      }
    } else {
      message.channel.send('Please specify a mood. Example: `!mood happy`');
    }
  }
});

// Get a Spotify track based on mood
const getSpotifyTrack = async (mood) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/recommendations`, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
      params: {
        seed_genres: mood,
        limit: 1,
      },
    });

    if (response.data.tracks.length > 0) {
      const track = response.data.tracks[0];
      return `${track.name} by ${track.artists.map((artist) => artist.name).join(', ')} - ${track.external_urls.spotify}`;
    }
  } catch (error) {
    console.error('Error fetching track from Spotify:', error);
  }
  return null;
};

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);
