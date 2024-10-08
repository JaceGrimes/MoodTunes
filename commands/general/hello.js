// commands/general/hello.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with a witty greeting using your nickname and avatar!'),
  
  async execute(interaction) {
    // Predefined list of witty responses
    const responses = [
      "Well, well, well! Look who decided to show up, {user}!",
      "Ahoy there, {user}! Fancy seeing you around these parts!",
      "Greetings, {user}! Looking sharp today! 😎",
      "Hey, {user}! Did you know you're the star of the server? 🌟",
      "Yo, {user}! You just brightened up my digital day! ✨",
      "Hello, {user}! Here to rock the server as always? 🎸",
      "What's up, {user}? Your presence just made the server 100% cooler! ❄️",
      "Hey there, {user}! Rocking that profile pic as always! 💯",
      "Good to see you, {user}! Ready for some fun? 🎉",
      "Why hello, {user}! You’re just in time to bring some life to the chat! 🎊"
    ];

    // Select a random response from the list
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Get the user's nickname if available, otherwise use their username
    const username = interaction.member.nickname || interaction.user.username;

    // Get the user's avatar URL
    const avatarUrl = interaction.user.displayAvatarURL({ format: 'png', dynamic: true });

    // Replace {user} with the actual username in the response
    const personalizedResponse = randomResponse.replace('{user}', username);

    // Reply with the personalized message and the user's avatar
    await interaction.reply({
      content: `${personalizedResponse}`,
      embeds: [
        {
          title: `👋 A Special Hello for ${username}!`,
          description: `Here's your avatar in case you forgot what you look like 😄`,
          image: { url: avatarUrl },
          color: 0x00FF00, // Optional: You can change this color value as desired
          footer: {
            text: 'MoodTunes Bot | Stay awesome!',
          }
        }
      ]
    });
  },
};
