const User = require('./userModel');
const bcrypt = require('bcryptjs');

// Function to register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with the given username or email.' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error while registering user.', error: error.message });
  }
};

// Function to login a user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide both username and password.' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Assuming a function to generate token exists
    // const token = generateToken(user._id);
    // res.status(200).json({ message: 'User logged in successfully.', token });

    // Placeholder response as token generation is not implemented in the snippet
    res.status(200).json({ message: 'User logged in successfully.', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error while logging in.', error: error.message });
  }
};

// Function to update user details
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating user.', error: error.message });
  }
};

// Function to delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await user.remove();
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting user.', error: error.message });
  }
};
