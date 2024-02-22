// TournamentBracket component
const TournamentBracket = () => {
  // Importing data from the JSON file
  const teams = require('./data.json').teams;
  const matches = require('./data.json').matches;

  // Function to find team details by ID
  const findTeamById = (id) => teams.find(team => team.id === id);

  // Function to render a single match
  const renderMatch = (match) => {
    const team1 = findTeamById(match.team1Id);
    const team2 = findTeamById(match.team2Id);
    return `
      <div class="match" style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div class="team" style="display: flex; align-items: center;">
          <img src="${team1.logo}" alt="${team1.name}" style="width: 50px; height: 50px; margin-right: 10px;">
          <span>${team1.name}</span>
        </div>
        <span style="color: #ffffff;">VS</span>
        <div class="team" style="display: flex; align-items: center;">
          <img src="${team2.logo}" alt="${team2.name}" style="width: 50px; height: 50px; margin-right: 10px;">
          <span>${team2.name}</span>
        </div>
      </div>
    `;
  };

  // Function to render all matches
  const renderMatches = () => {
    return matches.map(match => renderMatch(match)).join('');
  };

  // Main render function for the Tournament Bracket
  return `
    <div class="tournament-bracket" style="display: flex; flex-direction: column; align-items: center;">
      <h2 style="margin-bottom: 20px;">Tournament Bracket</h2>
      ${renderMatches()}
    </div>
  `;
};

export default TournamentBracket;
