const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to get tournament data
app.get('/api/tournament', (req, res) => {
    fs.readFile(path.join(__dirname, 'tournament_data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading tournament data file:', err);
            return res.status(500).send('Error reading tournament data');
        }
        res.json(JSON.parse(data));
    });
});

// Placeholder for other API endpoints
// For example, to update match results, handle user predictions, etc.

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
