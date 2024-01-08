// JavaScript Document
// Navbar
	function loadNavbar() {
		const navbarPlaceholder = document.getElementById('navbar-placeholder');
		if (!navbarPlaceholder) return;  // Exit if placeholder not found

		const xhr = new XMLHttpRequest();

		// Determine the correct path to navbar.html based on the current URL
		let navbarPath = 'navbar.html'; // Default path for stat page
		if (window.location.pathname.includes('/stats/archive/') || window.location.pathname.includes('/stats/event/')) {
			navbarPath = '../navbar.html'; // Path for pages in archive and events directories
		}

		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				navbarPlaceholder.innerHTML = this.responseText;
			}
		};

		xhr.open('GET', navbarPath, true);
		xhr.send();
	}

// Timer
    // Set the date and time for the countdown to end (e.g., "October 30, 2023 15:00:00")
    var countDownDate = new Date("February 1, 2024 15:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        // Time calculations
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        // If the countdown is finished, display some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "Update is now due! Please wait";
        }
    }, 1000);

// Styling
// Predefined list of Mods to bold
var usersToItalicize = ["AKIBA212", "AngleGabriel__", "Fossabot", "Livytaskbot", "Nightbot", "OSFrog", "Phantomspower", "PlayWithViewersBot", "Songlistbot", "StreamElements", "Streamlabs", "willzystreams", "Knight1y"];

// Predefined list of VIP's to italicize
var usersToBold = ["MaicoMolo", "BeholdBrooke", "LowLifePrincessx", "sammziee", "RD07x__", "OfficiallySp", "Sirjester2", "minoarno", "Tjorbjorn", "aribearree", "mikey98123", "MrXadion"];

// Function to update list styling
function updateListStyling() {
    var listItems = document.querySelectorAll('li');
    listItems.forEach(function(item) {
        // Extract username from the list item
        var username = item.textContent.split(':')[0];

        // Check and apply bold styling
        if (usersToBold.includes(username)) {
            item.innerHTML = '<strong>' + item.innerHTML + '</strong>';
        }

        // Check and apply italic styling
        if (usersToItalicize.includes(username)) {
            item.innerHTML = '<em>' + item.innerHTML + '</em>';
        }
    });
}

// Run the function to update styling
window.onload = function() {
    loadNavbar();
    updateListStyling();
};


