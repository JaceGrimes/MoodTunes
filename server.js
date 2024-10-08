const express = require('express');
const app = express();
const port = 3000;

// Route to handle Spotify's redirect URI
app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  res.send(`Received authorization code: ${code}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
