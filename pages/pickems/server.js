const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const tournamentController = require('./tournamentController');
const userController = require('./userController');
const pickController = require('./pickController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database connection
mongoose.connect('mongodb://localhost/leaguePickems', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to the Database.');
});
mongoose.connection.on('error', (error) => {
    console.log('Mongoose Connection Error : ' + error);
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Tournament Routes
app.post('/tournament', tournamentController.createTournament);
app.get('/tournament/:id', tournamentController.getTournament);
app.get('/tournaments', tournamentController.getAllTournaments);
app.put('/tournament/:id', tournamentController.updateTournament);
app.delete('/tournament/:id', tournamentController.deleteTournament);

// User Routes
app.post('/user', userController.createUser);
app.get('/user/:id', userController.getUser);
app.get('/users', userController.getAllUsers);
app.put('/user/:id', userController.updateUser);
app.delete('/user/:id', userController.deleteUser);

// Pick Routes
app.post('/pick', pickController.createPick);
app.get('/pick/:id', pickController.getPick);
app.get('/picks', pickController.getAllPicks);
app.put('/pick/:id', pickController.updatePick);
app.delete('/pick/:id', pickController.deletePick);

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
