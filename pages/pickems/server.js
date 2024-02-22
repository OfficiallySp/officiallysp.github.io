const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Read data from JSON file
const loadData = () => {
  try {
    const dataBuffer = fs.readFileSync('data.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// Write data to JSON file
const saveData = (data) => {
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync('data.json', dataJSON);
};

// API endpoint to get tournament data
app.get('/api/tournament', (req, res) => {
  const data = loadData();
  res.json(data);
});

// API endpoint to submit picks
app.post('/api/picks', (req, res) => {
  const picks = req.body;
  const data = loadData();
  data.picks.push(picks);
  saveData(data);
  res.status(201).send('Picks saved successfully!');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
