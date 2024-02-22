const Tournament = require('./tournamentModel');
const asyncHandler = require('express-async-handler');

// Create a new tournament
exports.createTournament = asyncHandler(async (req, res) => {
  const { name, startDate, endDate, teams } = req.body;

  // Check if the tournament already exists
  const tournamentExists = await Tournament.findOne({ name });
  if (tournamentExists) {
    res.status(400);
    throw new Error('Tournament already exists');
  }

  const tournament = await Tournament.create({
    name,
    startDate,
    endDate,
    teams
  });

  if (tournament) {
    res.status(201).json({
      _id: tournament._id,
      name: tournament.name,
      startDate: tournament.startDate,
      endDate: tournament.endDate,
      teams: tournament.teams,
      isActive: tournament.isActive
    });
  } else {
    res.status(400);
    throw new Error('Invalid tournament data');
  }
});

// Get all tournaments
exports.getTournaments = asyncHandler(async (req, res) => {
  const tournaments = await Tournament.find({});
  res.json(tournaments);
});

// Get a single tournament by ID
exports.getTournamentById = asyncHandler(async (req, res) => {
  const tournament = await Tournament.findById(req.params.id);

  if (tournament) {
    res.json(tournament);
  } else {
    res.status(404);
    throw new Error('Tournament not found');
  }
});

// Update a tournament
exports.updateTournament = asyncHandler(async (req, res) => {
  const tournament = await Tournament.findById(req.params.id);

  if (tournament) {
    tournament.name = req.body.name || tournament.name;
    tournament.startDate = req.body.startDate || tournament.startDate;
    tournament.endDate = req.body.endDate || tournament.endDate;
    tournament.teams = req.body.teams || tournament.teams;
    tournament.isActive = req.body.isActive;

    const updatedTournament = await tournament.save();
    res.json(updatedTournament);
  } else {
    res.status(404);
    throw new Error('Tournament not found');
  }
});

// Delete a tournament
exports.deleteTournament = asyncHandler(async (req, res) => {
  const tournament = await Tournament.findById(req.params.id);

  if (tournament) {
    await tournament.remove();
    res.json({ message: 'Tournament removed' });
  } else {
    res.status(404);
    throw new Error('Tournament not found');
  }
});

module.exports = exports;
