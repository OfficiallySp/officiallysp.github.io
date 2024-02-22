// Importing necessary components
import Navbar from './Navbar';
import TournamentBracket from './TournamentBracket';
import PickForm from './PickForm';

// Main App component
class App {
  constructor() {
    this.init();
  }

  // Method to initialize the application
  init() {
    this.render();
  }

  // Method to render the components
  render() {
    // Rendering the Navbar
    const navbarContainer = document.getElementById('navbar');
    navbarContainer.innerHTML = Navbar();

    // Rendering the Tournament Bracket
    const tournamentBracketContainer = document.getElementById('tournament-bracket');
    tournamentBracketContainer.innerHTML = TournamentBracket();

    // Rendering the Pick Form
    const pickFormContainer = document.getElementById('pick-form');
    pickFormContainer.innerHTML = PickForm();

    // Additional setup can be added here if needed
  }
}

// Instantiating the App to render the components
new App();
