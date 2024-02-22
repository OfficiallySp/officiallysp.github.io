const express = require('express');
const fs = require('fs');

// Create a router
const router = express.Router();

// Function to load data from JSON file
const loadData = () => {
  try {
    const dataBuffer = fs.readFileSync('data.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// Function to save data to JSON file
const saveData = (data) => {
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync('data.json', dataJSON);
};

// API endpoint to get tournament data
router.get('/api/tournament', (req, res) => {
  const data = loadData();
  res.json(data);
});

// API endpoint to submit picks
router.post('/api/picks', (req, res) => {
  const picks = req.body;
  const data = loadData();
  data.picks.push(picks);
  saveData(data);
  res.status(201).send('Picks saved successfully!');
});

module.exports = router;
