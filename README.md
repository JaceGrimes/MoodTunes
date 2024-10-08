# 🎵 MoodTunes Discord Bot

## 🎉 Introduction

MoodTunes is a music recommendation bot that allows users to get song suggestions based on their emotions. By connecting to the Spotify API, the bot can suggest tracks for a variety of moods such as `happy`, `sad`, `energetic`, and more. It also features a special command to get a random Daft Punk song for those who love electronic music.

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Bot](#-running-the-bot)
- [Commands](#-commands)
  - [Mood Command](#-mood-command)
  - [Secret Mood Command](#-secret-mood-command)
  - [Help Command](#-help-command)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)


## ✨ Features

- 🎶 **Mood-Based Song Recommendations**: Get song recommendations that match your mood using Spotify's recommendation engine.
- 🔎 **Find Songs for Specific Genres**: Discover new music based on genre-mood mappings.
- 🤫 **Secret Daft Punk Command**: Use a secret command to get a random Daft Punk track.
- 🛠️ **Slash Command Support**: Utilizes Discord's slash commands for easy usage.
- 📜 **Rich Embeds**: Displays song information and album art within Discord embeds.

## 📦 Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/en/) (v16.6.0 or higher)
- [Discord.js](https://discord.js.org/#/) (v14 or higher)
- A Discord bot token (create one [here](https://discord.com/developers/applications))
- A Spotify developer account (create one [here](https://developer.spotify.com/))

## 🚀 Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/moodtunes-bot.git

    cd moodtunes-bot

    npm install

## ⚙️ Configuration

1. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   DISCORD_TOKEN=your_discord_bot_token
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   YOUTUBE_API_KEY=your_youtube_api_key
   CLIENT_ID=your_discord_client_id

    Replace your_discord_bot_token with your Discord bot token.
    Replace your_spotify_client_id and your_spotify_client_secret with your Spotify API credentials.
    Replace your_youtube_api_key with your YouTube API key if YouTube integrations are needed.

    Ensure that you have enabled the Spotify Web API for your Spotify developer account.

    Set up the redirect URI for Spotify's OAuth2:
        Go to your Spotify Developer Dashboard.
        Click on your application.
        Set the Redirect URIs field to: http://localhost:3000/callback or any other URI you plan to use.

# 💬 Commands
## 🎶 Mood Command

Get a Spotify song recommendation based on your mood.

    Usage: /mood [mood]
    Example: /mood happy

The bot will reply with a song recommendation that matches your mood along with the track name, album name, and a link to the song on Spotify.

## 🤫 Secret Mood Command

Get a random Daft Punk song using this secret command.

    Usage: /secretmood
    Example: /secretmood

The bot will reply with a random Daft Punk song and provide a link to listen on Spotify.

## 🆘 Help Command

Displays a list of available commands and their descriptions.

    Usage: /help
    Example: /help

The bot will reply with a detailed list of all available commands.

## 📚 Usage

Once the bot is running, use the commands mentioned above in any channel where the bot has permissions. You can also use the following interactions:

    Mood Recommendations:
        Type /mood happy to get a song that matches the happy mood.

    Secret Daft Punk Song:
        Type /secretmood to receive a random Daft Punk song.

    Help Menu:
        Type /help to get a list of all commands and their usage.

## 🤝 Contributing

Contributions are welcome! If you have any ideas or improvements for the bot, feel free to submit a pull request or open an issue.

    Fork the repository.
    Create a new branch (git checkout -b feature-branch).
    Make your changes.
    Commit your changes (git commit -m 'Add some feature').
    Push to the branch (git push origin feature-branch).
    Open a pull request.