document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pickem-form');

    // Function to dynamically generate match-up options
    function generateMatchUps() {
        // Example match-ups, replace with dynamic content from your server
        const matchUps = [
            { id: 'match1', teams: ['Team 1', 'Team 2'] },
            { id: 'match2', teams: ['Team 3', 'Team 4'] },
            { id: 'match3', teams: ['Team 5', 'Team 6'] },
        ];

        const userPicksSection = document.getElementById('user-picks');

        matchUps.forEach(match => {
            const matchDiv = document.createElement('div');
            matchDiv.className = 'match-up';
            const label = document.createElement('label');
            label.setAttribute('for', match.id);
            label.textContent = `${match.teams[0]} vs ${match.teams[1]}:`;
            const select = document.createElement('select');
            select.name = match.id;
            select.id = match.id;
            match.teams.forEach(team => {
                const option = document.createElement('option');
                option.value = team;
                option.textContent = team;
                select.appendChild(option);
            });
            matchDiv.appendChild(label);
            matchDiv.appendChild(select);
            userPicksSection.insertBefore(matchDiv, form);
        });
    }

    // Function to handle form submission
    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const picks = {};
        for (let [key, value] of formData.entries()) {
            picks[key] = value;
        }
        console.log('User Picks:', picks);
        // Here you would typically send the data to the server
        // For example: fetch('/api/picks', { method: 'POST', body: JSON.stringify(picks), headers: { 'Content-Type': 'application/json' } })
        alert('Picks submitted! Check the console for the output.');
    }

    generateMatchUps();
    form.addEventListener('submit', handleFormSubmit);
});
