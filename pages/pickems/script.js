// Fetching tournament data from the JSON file
fetch('tournament_data.json')
  .then(response => response.json())
  .then(data => {
    displayTournamentInfo(data);
    generatePickemForm(data.teams);
  })
  .catch(error => console.error('Error loading tournament data:', error));

// Function to display tournament information
function displayTournamentInfo(data) {
  const tournamentDetails = document.getElementById('tournamentDetails');
  let detailsHTML = `<h3>${data.tournamentName}</h3>`;
  detailsHTML += '<ul>';
  data.matches.forEach(match => {
    const team1 = data.teams.find(team => team.id === match.team1Id).name;
    const team2 = data.teams.find(team => team.id === match.team2Id).name;
    detailsHTML += `<li>${team1} vs ${team2} - ${new Date(match.date).toLocaleString()} (${match.stage})</li>`;
  });
  detailsHTML += '</ul>';
  tournamentDetails.innerHTML = detailsHTML;
}

// Function to generate the pick'em form
function generatePickemForm(teams) {
  const pickemForm = document.getElementById('pickemForm');
  let formHTML = '';
  teams.forEach(team => {
    formHTML += `
      <div class="pickem-team">
        <input type="radio" id="team${team.id}" name="pickem" value="${team.id}">
        <label for="team${team.id}">
          <img src="${team.logo}" alt="${team.name} logo">
          ${team.name}
        </label>
      </div>
    `;
  });
  formHTML += '<button type="submit">Submit Picks</button>';
  pickemForm.innerHTML = formHTML;

  // Adding event listener for form submission
  pickemForm.addEventListener('submit', handleFormSubmit);
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const pickedTeamId = formData.get('pickem');
  alert(`You picked team ID: ${pickedTeamId}`);
  // Here you would typically send the pick to the server for storage or further processing
}
