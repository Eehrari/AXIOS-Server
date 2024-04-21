const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Load scenarios from JSON file
const scenariosData = JSON.parse(fs.readFileSync('scenarios.json'));

// Define a route to handle requests for a random scenario
app.get('/random', (req, res) => {
  // Select a random scenario from the data
  const randomIndex = Math.floor(Math.random() * scenariosData.length);
  const randomScenario = scenariosData[randomIndex];
  
  // Send the random scenario as the response
  res.json(randomScenario);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
