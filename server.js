const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

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

// Define the /createtask route to handle POST requests
app.post('/createtask', (req, res) => {
  // Extract task data from the request body
  const newTask = req.body;

  // Generate a unique taskID for the new task
  const newTaskID = Date.now().toString();

  // Add taskID to the new task object
  newTask.taskID = newTaskID;

  // Add the new task to the scenariosData array
  scenariosData.push(newTask);

  // Write the updated scenariosData back to the JSON file
  fs.writeFileSync('scenarios.json', JSON.stringify(scenariosData, null, 2));

  // Send a response indicating success
  res.send('Task created successfully');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
