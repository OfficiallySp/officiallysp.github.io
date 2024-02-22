const express = require('express');
const router = express.Router();
const Pick = require('./pickModel');
const User = require('./userModel');
const Tournament = require('./tournamentModel');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.status(401).json({ message: 'You must be logged in to perform this action.' });
  }
};

// Create a pick
router.post('/create', isAuthenticated, async (req, res) => {
  try {
    const { tournament, match, selectedTeam } = req.body;
    const user = req.session.userId;

    // Validate if all fields are provided
    if (!tournament || !match || !selectedTeam) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create the pick
    const pick = await Pick.create({ user, tournament, match, selectedTeam });

    // Add pick to user's picks
    await User.findByIdAndUpdate(user, { $push: { 'pickems.picks': pick._id } });

    res.status(201).json(pick);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pick', error: error.message });
  }
});

// Update a pick
router.put('/update/:id', isAuthenticated, async (req, res) => {
  try {
    const { selectedTeam } = req.body;
    const { id } = req.params;

    if (!selectedTeam) {
      return res.status(400).json({ message: 'Selected team is required.' });
    }

    const pick = await Pick.findByIdAndUpdate(id, { selectedTeam }, { new: true });

    if (!pick) {
      return res.status(404).json({ message: 'Pick not found.' });
    }

    res.status(200).json(pick);
  } catch (error) {
    res.status(500).json({ message: 'Error updating pick', error: error.message });
  }
});

// Delete a pick
router.delete('/delete/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    const pick = await Pick.findByIdAndDelete(id);

    if (!pick) {
      return res.status(404).json({ message: 'Pick not found.' });
    }

    // Remove pick from user's picks
    await User.findByIdAndUpdate(pick.user, { $pull: { 'pickems.picks': pick._id } });

    res.status(200).json({ message: 'Pick deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pick', error: error.message });
  }
});

module.exports = router;
