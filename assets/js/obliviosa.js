/**
 * obliviosa Countdown Script
 * Target Date: December 6, 2025
 */

// Positive messages that cycle through
const celebratoryMessages = [
    "something amazing is approaching...",
    "the excitement builds with each moment...",
    "good things come to those who wait...",
    "the best is yet to come...",
    "dreams are about to become reality...",
    "good things take time...",
    "adventure awaits on the horizon...",
    "the future looks incredibly bright...",
    "something special is brewing...",
    "the stars are align perfectly...",
];

// Target date: December 6, 2025 at midnight
const targetDate = new Date('December 6, 2025 00:00:00').getTime();

// Calculate the total duration for progress calculation
const startDate = new Date().getTime();
const totalDuration = targetDate - startDate;

// DOM elements
let daysElement, hoursElement, minutesElement, secondsElement;
let progressBar, progressPercent, crypticMessageElement;

// Initialize the countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    daysElement = document.getElementById('days');
    hoursElement = document.getElementById('hours');
    minutesElement = document.getElementById('minutes');
    secondsElement = document.getElementById('seconds');
    progressBar = document.getElementById('progressBar');
    progressPercent = document.getElementById('progressPercent');
    crypticMessageElement = document.getElementById('crypticMessage');
    
    // Start the countdown
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
    
    // Start celebratory message cycling
    cycleCelebratoryMessages();
    setInterval(cycleCelebratoryMessages, 8000); // Change message every 8 seconds
    
    // Add some atmospheric effects
    addGlitchEffects();
    addRandomFlickers();
});

function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;
    
    // Check if countdown has ended
    if (timeRemaining < 0) {
        handleCountdownEnd();
        return;
    }
    
    // Calculate time units
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Update display with padding
    if (daysElement) daysElement.textContent = String(days).padStart(3, '0');
    if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
    if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
    if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');
    
    // Update progress bar
    updateProgress(timeRemaining);
    
    // Add random glitches to numbers occasionally
    if (Math.random() < 0.02) { // 2% chance per second
        addNumberGlitch();
    }
}

function updateProgress(timeRemaining) {
    if (!progressBar || !progressPercent) return;
    
    const elapsed = totalDuration - timeRemaining;
    const progressPercentage = Math.max(0, (elapsed / totalDuration) * 100);
    
    // Update progress bar width
    progressBar.style.width = `${progressPercentage}%`;
    
    // Update percentage text
    progressPercent.textContent = `${progressPercentage.toFixed(1)}%`;
    
    // Add some visual effects based on progress
    if (progressPercentage > 90) {
        progressBar.style.boxShadow = '0 0 30px rgba(255, 107, 157, 0.9)';
    } else if (progressPercentage > 75) {
        progressBar.style.boxShadow = '0 0 25px rgba(255, 107, 157, 0.7)';
    }
}

function cycleCelebratoryMessages() {
    if (!crypticMessageElement) return;
    
    const randomMessage = celebratoryMessages[Math.floor(Math.random() * celebratoryMessages.length)];
    
    // Fade out current message
    crypticMessageElement.style.opacity = '0';
    
    setTimeout(() => {
        crypticMessageElement.textContent = randomMessage;
        crypticMessageElement.style.opacity = '0.7';
    }, 500);
}

function handleCountdownEnd() {
    // When countdown reaches zero
    if (daysElement) daysElement.textContent = '000';
    if (hoursElement) hoursElement.textContent = '00';
    if (minutesElement) minutesElement.textContent = '00';
    if (secondsElement) secondsElement.textContent = '00';
    
    // Final message
    if (crypticMessageElement) {
        crypticMessageElement.textContent = 'the moment has arrived! 🎉 something amazing is happening...';
        crypticMessageElement.style.color = '#ff6b9d';
        crypticMessageElement.style.fontSize = '1.2rem';
    }
    
    // Add celebratory visual effects
    document.body.style.animation = 'celebrateGlitch 2s infinite';
    
    // Complete progress
    if (progressBar) {
        progressBar.style.width = '100%';
        progressBar.style.boxShadow = '0 0 50px rgba(255, 107, 157, 1)';
    }
    if (progressPercent) {
        progressPercent.textContent = '100.0%';
    }
}

function addNumberGlitch() {
    const timeValues = [daysElement, hoursElement, minutesElement, secondsElement];
    const randomElement = timeValues[Math.floor(Math.random() * timeValues.length)];
    
    if (randomElement) {
        const originalText = randomElement.textContent;
        
        // Create random glitched text
        let glitchedText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.3) {
                glitchedText += Math.floor(Math.random() * 10);
            } else {
                glitchedText += originalText[i];
            }
        }
        
        // Apply glitch briefly
        randomElement.textContent = glitchedText;
        randomElement.style.color = '#ff6b9d';
        randomElement.style.textShadow = '2px 2px #4ecdc4, -2px -2px #45b7d1';
        
        // Restore after short delay
        setTimeout(() => {
            randomElement.textContent = originalText;
            randomElement.style.color = '#ffffff';
            randomElement.style.textShadow = 'none';
        }, 150);
    }
}

function addGlitchEffects() {
    // Add random color shifts (less intense)
    setInterval(() => {
        if (Math.random() < 0.003) { // 0.3% chance
            document.body.style.filter = 'hue-rotate(45deg) saturate(120%)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 150);
        }
    }, 1000);
    
    // Add random static bursts
    setInterval(() => {
        if (Math.random() < 0.008) { // 0.8% chance
            const noise = document.querySelector('.noise');
            if (noise) {
                noise.style.opacity = '0.08';
                setTimeout(() => {
                    noise.style.opacity = '0.03';
                }, 150);
            }
        }
    }, 1000);
}

function addRandomFlickers() {
    // Random text flickering
    const flickerElements = document.querySelectorAll('.whisper, .whisper-2, .whisper-3, .subtitle');
    
    setInterval(() => {
        if (Math.random() < 0.02) { // 2% chance
            const randomElement = flickerElements[Math.floor(Math.random() * flickerElements.length)];
            if (randomElement) {
                const originalOpacity = randomElement.style.opacity || '0.7';
                randomElement.style.opacity = '0';
                
                setTimeout(() => {
                    randomElement.style.opacity = originalOpacity;
                }, 100);
            }
        }
    }, 1000);
}

// Add keyboard easter egg
let currentSequence = [];
document.addEventListener('keydown', function(event) {
    // Konami code-like sequence: o-b-l-i-v-i-o-s-a
    const sequence = ['o', 'b', 'l', 'i', 'v', 'i', 'o', 's', 'a'];
    
    currentSequence.push(event.key.toLowerCase());
    
    // Keep only the last 9 keys
    if (currentSequence.length > sequence.length) {
        currentSequence.shift();
    }
    
    // Check if sequence matches
    if (currentSequence.length === sequence.length &&
        currentSequence.every((key, index) => key === sequence[index])) {
        triggerEasterEgg();
        currentSequence = [];
    }
});

function triggerEasterEgg() {
    // Special effect when "obliviosa" is typed
    const body = document.body;
    body.style.animation = 'rainbow 2s infinite';
    
    if (crypticMessageElement) {
        crypticMessageElement.textContent = 'hey there liv! 💖 you found the secret message!';
        crypticMessageElement.style.color = '#4ecdc4';
        crypticMessageElement.style.fontSize = '1.1rem';
    }
    
    // Add temporary rainbow effect
    setTimeout(() => {
        body.style.animation = '';
        cycleCelebratoryMessages(); // Return to normal messages
    }, 4000);
}

// CSS for celebration effects
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrateGlitch {
        0%, 74%, 76%, 79%, 81%, 100% { transform: translate(0); filter: hue-rotate(0deg) brightness(1); }
        75% { transform: translate(-3px, 3px); filter: hue-rotate(60deg) brightness(1.1); }
        77% { transform: translate(3px, -3px); filter: hue-rotate(120deg) brightness(1.1); }
        78% { transform: translate(-2px, 2px); filter: hue-rotate(180deg) brightness(1.2); }
        80% { transform: translate(2px, -2px); filter: hue-rotate(240deg) brightness(1.1); }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg) saturate(1.2); }
        25% { filter: hue-rotate(90deg) saturate(1.3); }
        50% { filter: hue-rotate(180deg) saturate(1.4); }
        75% { filter: hue-rotate(270deg) saturate(1.3); }
        100% { filter: hue-rotate(360deg) saturate(1.2); }
    }
`;
document.head.appendChild(style);
