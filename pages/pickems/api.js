import axios from 'axios';

// Base URL for the API
const BASE_URL = '/api';

// Function to get tournament data
export const getTournamentData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tournament`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tournament data:', error);
    throw error;
  }
};

// Function to submit picks
export const submitPicks = async (picks) => {
  try {
    const response = await axios.post(`${BASE_URL}/picks`, picks);
    return response.data;
  } catch (error) {
    console.error('Error submitting picks:', error);
    throw error;
  }
};
