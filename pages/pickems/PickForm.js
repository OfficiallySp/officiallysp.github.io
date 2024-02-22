// PickForm component
const PickForm = () => {
  // Importing data from the JSON file
  const teams = require('./data.json').teams;

  // Function to render team options
  const renderTeamOptions = () => {
    return teams.map(team => `<option value="${team.id}">${team.name}</option>`).join('');
  };

  // Main render function for the Pick Form
  return `
    <form id="pick-form" onsubmit="submitPickForm(event)">
      <h2 style="margin-bottom: 20px;">Make Your Picks</h2>
      <label for="team-pick">Choose a team:</label>
      <select id="team-pick" name="team-pick" required>
        <option value="">Select a team</option>
        ${renderTeamOptions()}
      </select>
      <input type="submit" value="Submit">
    </form>
  `;
};

// Function to handle form submission
// Note: You'll need to implement the actual submission logic based on your project's requirements
window.submitPickForm = (event) => {
  event.preventDefault();
  const teamPick = document.getElementById('team-pick').value;
  console.log(`Team ID picked: ${teamPick}`);
  // Here you would typically send the pick to the server or handle it according to your project's needs
};

export default PickForm;
