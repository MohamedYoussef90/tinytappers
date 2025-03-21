// Global variables
let lastKeyPressed = '';
let isMuted = false;
let isHighContrast = false;
let audioInitialized = false;
const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#6C5CE7', '#72CC50', '#FF9FF3', '#FDCB6E', '#55E6C1'];
const shapes = ['circle', 'square', 'triangle', 'star', 'heart'];
const animations = ['bounce', 'spin', 'pulse', 'wobble', 'tada', 'jello', 'heartbeat'];
const animals = {
    'A': { emoji: '🦁', sound: 'lion' },
    'B': { emoji: '🐻', sound: 'bear' },
    'C': { emoji: '🐱', sound: 'cat' },
    'D': { emoji: '🐶', sound: 'dog' },
    'E': { emoji: '🐘', sound: 'elephant' },
    'F': { emoji: '🐸', sound: 'frog' },
    'G': { emoji: '🦒', sound: 'giraffe' },
    'H': { emoji: '🐹', sound: 'hamster' },
    'I': { emoji: '🦔', sound: 'hedgehog' },
    'J': { emoji: '🦘', sound: 'kangaroo' },
    'K': { emoji: '🐨', sound: 'koala' },
    'L': { emoji: '🦁', sound: 'lion' },
    'M': { emoji: '🐵', sound: 'monkey' },
    'N': { emoji: '🦉', sound: 'owl' },
    'O': { emoji: '🦧', sound: 'orangutan' },
    'P': { emoji: '🐧', sound: 'penguin' },
    'Q': { emoji: '🦆', sound: 'duck' },
    'R': { emoji: '🐰', sound: 'rabbit' },
    'S': { emoji: '🐍', sound: 'snake' },
    'T': { emoji: '🐯', sound: 'tiger' },
    'U': { emoji: '🦄', sound: 'unicorn' },
    'V': { emoji: '🦊', sound: 'fox' },
    'W': { emoji: '🐺', sound: 'wolf' },
    'X': { emoji: '🦖', sound: 'dinosaur' },
    'Y': { emoji: '🐮', sound: 'cow' },
    'Z': { emoji: '🦓', sound: 'zebra' }
};
const numbers = {
    '0': { emoji: '0️⃣', sound: 'zero' },
    '1': { emoji: '1️⃣', sound: 'one' },
    '2': { emoji: '2️⃣', sound: 'two' },
    '3': { emoji: '3️⃣', sound: 'three' },
    '4': { emoji: '4️⃣', sound: 'four' },
    '5': { emoji: '5️⃣', sound: 'five' },
    '6': { emoji: '6️⃣', sound: 'six' },
    '7': { emoji: '7️⃣', sound: 'seven' },
    '8': { emoji: '8️⃣', sound: 'eight' },
    '9': { emoji: '9️⃣', sound: 'nine' }
};
const sounds = {
    'pop': null,
    'bounce': null,
    'sparkle': null
};
const animalSounds = {};
const numberSounds = {};
let confettiCount = 0;
const maxConfetti = 100;
let backgroundElements = [];

// Security measures
const securityConfig = {
    contentSecurityPolicy: true,
    xssProtection: true,
    secureInputHandling: true
};


// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Kids Keyboard Fun initialized!');

    // Apply security measures
    applySecurityMeasures();
    
    createSoundElements();
    
    // Initialize start button
    initializeStartButton();
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyPress);
    
    // Add touch/click event listener for mobile devices
    document.getElementById('display-area').addEventListener('click', handleScreenTouch);
    
    // Add window resize listener to adjust animation area
    window.addEventListener('resize', handleWindowResize);
    
    // Create background elements
    createBackgroundElements();
    
    // Initialize help modal and settings
    initializeHelpAndSettings();
    // Add secure badge
    addSecureBadge();
});

// Apply security measures
function applySecurityMeasures() {
    if (securityConfig.contentSecurityPolicy) {
        // Create a meta tag for Content Security Policy
        const metaCSP = document.createElement('meta');
        metaCSP.httpEquiv = 'Content-Security-Policy';
        metaCSP.content = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; media-src 'self'; object-src 'none'; child-src 'none';";
        document.head.appendChild(metaCSP);
    }
    
    if (securityConfig.xssProtection) {
        // Create a meta tag for X-XSS-Protection
        const metaXSS = document.createElement('meta');
        metaXSS.httpEquiv = 'X-XSS-Protection';
        metaXSS.content = '1; mode=block';
        document.head.appendChild(metaXSS);
    }
    
    // Sanitize all user inputs
    if (securityConfig.secureInputHandling) {
        // This is handled in the input processing functions
        console.log('Secure input handling enabled');
    }
}

// Add secure badge to the page
function addSecureBadge() {
    const secureBadge = document.createElement('div');
    secureBadge.className = 'secure-badge';
    secureBadge.innerHTML = '<span>🔒</span> Secure';
    document.body.appendChild(secureBadge);
}

// Initialize start button
function initializeStartButton() {
    const startButton = document.getElementById('start-button');
    const startButtonContainer = document.getElementById('start-button-container');
    
    if (startButton && startButtonContainer) {
        // Style the start button
        startButton.style.padding = '20px 40px';
        startButton.style.fontSize = '24px';
        startButton.style.backgroundColor = '#4CAF50';
        startButton.style.color = 'white';
        startButton.style.border = 'none';
        startButton.style.borderRadius = '12px';
        startButton.style.cursor = 'pointer';
        startButton.style.boxShadow = '0 9px #999';
        startButton.style.outline = 'none';
        startButton.style.margin = '20px 0';
        
        // Add hover effect
        startButton.addEventListener('mouseover', () => {
            startButton.style.backgroundColor = '#3e8e41';
        });
        
        startButton.addEventListener('mouseout', () => {
            startButton.style.backgroundColor = '#4CAF50';
        });
        
        // Add active effect
        startButton.addEventListener('mousedown', () => {
            startButton.style.backgroundColor = '#3e8e41';
            startButton.style.boxShadow = '0 5px #666';
            startButton.style.transform = 'translateY(4px)';
        });
        
        startButton.addEventListener('mouseup', () => {
            startButton.style.backgroundColor = '#4CAF50';
            startButton.style.boxShadow = '0 9px #999';
            startButton.style.transform = 'translateY(0)';
        });
        
        // Add click event to initialize audio
        startButton.addEventListener('click', () => {
            initializeAudio();
            startButtonContainer.style.display = 'none';
            
            // Create welcome animation after button click
            createWelcomeAnimation();
        });
    }
}

// Initialize audio
function initializeAudio() {
    // Play and immediately pause all sounds to initialize them
    const allSounds = [sounds.pop, sounds.bounce, sounds.sparkle];
    
    // Initialize basic sounds
    allSounds.forEach(sound => {
        if (sound) {
            sound.play().then(() => {
                sound.pause();
                sound.currentTime = 0;
            }).catch(error => {
                console.log('Audio initialization failed:', error);
            });
        }
    });
    
    // Initialize animal sounds
    for (const key in animalSounds) {
        const sound = animalSounds[key];
        if (sound) {
            sound.play().then(() => {
                sound.pause();
                sound.currentTime = 0;
            }).catch(error => {
                console.log('Animal sound initialization failed:', error);
            });
        }
    }
    
    // Initialize number sounds
    for (const key in numberSounds) {
        const sound = numberSounds[key];
        if (sound) {
            sound.play().then(() => {
                sound.pause();
                sound.currentTime = 0;
            }).catch(error => {
                console.log('Number sound initialization failed:', error);
            });
        }
    }
    
    audioInitialized = true;
    console.log('Audio initialized');
    
    // Play a test sound to confirm initialization
    if (sounds.pop) {
        sounds.pop.play().catch(error => {
            console.log('Test sound failed:', error);
        });
    }
}

// Initialize help modal and settings
function initializeHelpAndSettings() {
    const helpButton = document.getElementById('help-button');
    const helpModal = document.getElementById('help-modal');
    const closeButton = document.querySelector('.close-button');
    const highContrastToggle = document.getElementById('high-contrast-toggle');
    const muteToggle = document.getElementById('mute-toggle');
    const suggestionButton = document.getElementById('suggestion-button');
    const suggestionEmail = document.getElementById('suggestion-email');
    
    // Style the help modal
    if (helpModal) {
        helpModal.style.display = 'none';
        helpModal.style.position = 'fixed';
        helpModal.style.zIndex = '1000';
        helpModal.style.left = '0';
        helpModal.style.top = '0';
        helpModal.style.width = '100%';
        helpModal.style.height = '100%';
        helpModal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        
        const modalContent = helpModal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.backgroundColor = '#fff';
            modalContent.style.margin = '10% auto';
            modalContent.style.padding = '20px';
            modalContent.style.border = '1px solid #888';
            modalContent.style.width = '80%';
            modalContent.style.maxWidth = '600px';
            modalContent.style.borderRadius = '15px';
            modalContent.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        }
        
        if (closeButton) {
            closeButton.style.color = '#aaa';
            closeButton.style.float = 'right';
            closeButton.style.fontSize = '28px';
            closeButton.style.fontWeight = 'bold';
            closeButton.style.cursor = 'pointer';
        }
    }
    
    // Add event listeners for help modal
    if (helpButton) {
        helpButton.addEventListener('click', () => {
            if (helpModal) {
                helpModal.style.display = 'block';
                // Reset suggestion email visibility when opening modal
                if (suggestionEmail) {
                    suggestionEmail.style.display = 'none';
                }
            }
        });
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (helpModal) {
                helpModal.style.display = 'none';
            }
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });
    
    // Add event listeners for settings
    if (highContrastToggle) {
        highContrastToggle.addEventListener('change', () => {
            isHighContrast = highContrastToggle.checked;
            if (isHighContrast) {
                document.body.classList.add('high-contrast-mode');
            } else {
                document.body.classList.remove('high-contrast-mode');
            }
        });
    }
    
    if (muteToggle) {
        muteToggle.addEventListener('change', () => {
            isMuted = muteToggle.checked;
        });
    }

    // Add event listener for suggestion button
    if (suggestionButton && suggestionEmail) {
        suggestionButton.addEventListener('click', () => {
            suggestionEmail.style.display = 'block';
            // Add a small animation to the email link
            suggestionEmail.style.animation = 'fadeIn 0.5s ease';
            // Remove animation after it completes
            setTimeout(() => {
                suggestionEmail.style.animation = '';
            }, 500);
        });
    }
}

// Create sound elements
function createSoundElements() {
    // Basic sounds
    sounds.pop = document.getElementById('pop-sound');
    sounds.bounce = document.getElementById('bounce-sound');
    sounds.sparkle = document.getElementById('sparkle-sound');
    
    // Create animal sound elements
    const animalSoundsContainer = document.getElementById('animal-sounds');
    for (const letter in animals) {
        const animal = animals[letter];
        const audioElement = document.createElement('audio');
        audioElement.src = `sounds/${animal.sound}.mp3`;
        audioElement.preload = 'auto';
        audioElement.id = `${animal.sound}-sound`;
        animalSoundsContainer.appendChild(audioElement);
        animalSounds[letter] = audioElement;
    }
    
    // Create number sound elements
    const numberSoundsContainer = document.getElementById('number-sounds');
    for (const num in numbers) {
        const number = numbers[num];
        const audioElement = document.createElement('audio');
        audioElement.src = `sounds/${number.sound}.mp3`;
        audioElement.preload = 'auto';
        audioElement.id = `${number.sound}-sound`;
        numberSoundsContainer.appendChild(audioElement);
        numberSounds[num] = audioElement;
    }
    
    console.log('All sound elements initialized');
}

// Helper function to get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Create background elements
function createBackgroundElements() {
    const animationArea = document.getElementById('animation-area');
    if (!animationArea) {
        return;
    }
    
    // Clear existing background elements
    backgroundElements.forEach(element => {
        if (element.parentNode === animationArea) {
            animationArea.removeChild(element);
        }
    });
    
    backgroundElements = [];
    
    // Create new background elements
    for (let i = 0; i < 10; i++) {
        // Create element
        const element = document.createElement('div');
        element.className = 'bg-element float';
        
        // Random emoji
        const emojis = ['☪', '☁️', '🌟', '🌙', '🌞', '🎈', '🎀', '🎵', '🎶', '🦋', '🐝', '🌸', '🌼', '🌺','🕌','☪️'];
        element.textContent = getRandomItem(emojis);
        element.style.fontSize = `${Math.floor(Math.random() * 40) + 20}px`;
        
        // Random position
        const left = Math.floor(Math.random() * 90) + 5;
        const top = Math.floor(Math.random() * 90) + 5;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        
        // Random animation duration and delay
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
        
        // Add to animation area
        animationArea.appendChild(element);
        
        // Add to background elements array
        backgroundElements.push(element);
    }
}

// Handle key press events
function handleKeyPress(event) {
    // Check if audio is initialized
    if (!audioInitialized) {
        const startButtonContainer = document.getElementById('start-button-container');
        if (startButtonContainer && startButtonContainer.style.display !== 'none') {
            // Simulate click on start button
            const startButton = document.getElementById('start-button');
            if (startButton) {
                startButton.click();
            }
        }
    }
    
    // Get the key in uppercase
    const key = event.key.toUpperCase();
    
    // Skip if it's a modifier key or function key
    if (['SHIFT', 'CONTROL', 'ALT', 'META', 'CAPSLOCK', 'TAB', 'ESCAPE'].includes(key) || 
        key.startsWith('F') && !isNaN(key.substring(1))) {
        return;
    }
    
    // Display the pressed key with appropriate emoji if available
    const keyDisplay = document.getElementById('key-display');
    
    // Check if it's a letter (A-Z)
    if (/^[A-Z]$/.test(key) && animals[key]) {
        keyDisplay.textContent = `${key} ${animals[key].emoji}`;
        keyDisplay.style.color = colors[key.charCodeAt(0) % colors.length];
    } 
    // Check if it's a number (0-9)
    else if (/^[0-9]$/.test(key) && numbers[key]) {
        keyDisplay.textContent = `${key} ${numbers[key].emoji}`;
        keyDisplay.style.color = colors[key.charCodeAt(0) % colors.length];
    }
    // Otherwise just show the key
    else {
        keyDisplay.textContent = key;
        keyDisplay.style.color = colors[key.charCodeAt(0) % colors.length];
    }
    
    // Add random animation to key display
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    keyDisplay.classList.remove(...animations); // Remove any existing animation classes
    keyDisplay.classList.add(randomAnimation);
    
    // Remove the animation class after animation completes
    setTimeout(() => {
        keyDisplay.classList.remove(randomAnimation);
    }, 1000);
    
    // Create visual element based on key press
    createVisualElement(key);
    
    // Play sound
    playSound(key);
    
    // Create confetti effect for special keys
    if (/^[AEIOU]$/.test(key) || /^[05]$/.test(key)) {
        createConfetti();
    }
    
    // Animate background elements
    animateBackgroundElements();
    
    // Store last key pressed
    lastKeyPressed = key;
}


// Sanitize input for security
function sanitizeInput(input) {
    // Limit input length
    if (input.length > 1) {
				 
				   
	
        // Allow arrow keys and special keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Enter', 'Escape', 'Tab'].includes(input)) {
            return input;
        }
        return input.charAt(0);
    }
    
    // Remove any potentially harmful characters
    return input.replace(/[^\w\s]/gi, '');
	
							 
						 
}



// Handle touch/click events for mobile devices
function handleScreenTouch(event) {
    // Check if audio is initialized
    if (!audioInitialized) {
        const startButtonContainer = document.getElementById('start-button-container');
        if (startButtonContainer && startButtonContainer.style.display !== 'none') {
            // Simulate click on start button
            const startButton = document.getElementById('start-button');
            if (startButton) {
                startButton.click();
                return; // Don't process the touch event further
            }
        }
    }
    
    // Generate a random letter for touch events
    const randomKey = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    
    // Display the random key with emoji
    const keyDisplay = document.getElementById('key-display');
    if (animals[randomKey]) {
        keyDisplay.textContent = `${randomKey} ${animals[randomKey].emoji}`;
        keyDisplay.style.color = colors[randomKey.charCodeAt(0) % colors.length];
    } else {
        keyDisplay.textContent = randomKey;
        keyDisplay.style.color = colors[randomKey.charCodeAt(0) % colors.length];
    }
    
    // Add random animation to key display
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    keyDisplay.classList.remove(...animations); // Remove any existing animation classes
    keyDisplay.classList.add(randomAnimation);
    
    // Remove the animation class after animation completes
    setTimeout(() => {
        keyDisplay.classList.remove(randomAnimation);
    }, 1000);
    
    // Create visual element at touch position
    createVisualElementAtPosition(randomKey, event.clientX, event.clientY);
    
    // Play sound
    playSound(randomKey);
    
    // Create confetti effect for vowels
    if (/^[AEIOU]$/.test(randomKey)) {
        createConfetti();
    }
    
    // Animate background elements
    animateBackgroundElements();
}

// Create visual element based on key press
function createVisualElement(key) {
    const animationArea = document.getElementById('animation-area');
    const element = document.createElement('div');
    
    // Set element properties
    element.classList.add('animation-element');
    
    // Determine shape based on key
    const shapeIndex = key.charCodeAt(0) % shapes.length;
    const shape = shapes[shapeIndex];
    
    // Determine color based on key
    const colorIndex = key.charCodeAt(0) % colors.length;
    const color = colors[colorIndex];
    
    // Check if it's a letter with an animal emoji
    if (/^[A-Z]$/.test(key) && animals[key]) {
        element.innerHTML = animals[key].emoji;
        element.style.fontSize = '100px'; // Larger for better visibility
        element.style.backgroundColor = 'transparent';
    }
    // Check if it's a number with an emoji
    else if (/^[0-9]$/.test(key) && numbers[key]) {
        element.innerHTML = numbers[key].emoji;
        element.style.fontSize = '100px'; // Larger for better visibility
        element.style.backgroundColor = 'transparent';
    }
    // Otherwise use shapes
    else {
        // Set element style based on shape and color
        element.style.backgroundColor = color;
        
        if (shape === 'circle') {
            element.style.width = '120px'; // Larger for better visibility
            element.style.height = '120px';
            element.style.borderRadius = '50%';
        } else if (shape === 'square') {
            element.style.width = '120px';
            element.style.height = '120px';
        } else if (shape === 'triangle') {
            element.style.width = '0';
            element.style.height = '0';
            element.style.borderLeft = '60px solid transparent';
            element.style.borderRight = '60px solid transparent';
            element.style.borderBottom = '120px solid ' + color;
            element.style.backgroundColor = 'transparent';
        } else if (shape === 'star') {
            element.innerHTML = '★';
            element.style.fontSize = '120px';
            element.style.color = color;
            element.style.backgroundColor = 'transparent';
        } else if (shape === 'heart') {
            element.innerHTML = '❤';
            element.style.fontSize = '120px';
            element.style.color = color;
            element.style.backgroundColor = 'transparent';
        }
    }
    
    // Position element randomly in the animation area
    const maxX = animationArea.clientWidth - 120;
    const maxY = animationArea.clientHeight - 120;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    element.style.left = randomX + 'px';
    element.style.top = randomY + 'px';
    
    // Add random animation class
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    element.classList.add('fade-in', randomAnimation);
    
    // Add element to animation area
    animationArea.appendChild(element);
    
    // Add floating animation
    floatElement(element);
    
    // Make element interactive
    element.addEventListener('click', () => {
        // Play sound when clicked
        playSound(key);
        
        // Add random animation
        const clickAnimation = animations[Math.floor(Math.random() * animations.length)];
        element.classList.remove(...animations);
        element.classList.add(clickAnimation);
        
        // Remove animation class after it completes
        setTimeout(() => {
            element.classList.remove(clickAnimation);
        }, 1000);
    });
    
    // Remove element after animation completes (longer duration for young children)
    setTimeout(() => {
        element.style.opacity = '0';
        setTimeout(() => {
            if (element.parentNode === animationArea) {
                animationArea.removeChild(element);
            }
        }, 500);
    }, 6000); // Longer duration for young children
}

// Create visual element at specific position (for touch events)
function createVisualElementAtPosition(key, x, y) {
    const animationArea = document.getElementById('animation-area');
    const rect = animationArea.getBoundingClientRect();
    
    // Convert page coordinates to element coordinates
    const elementX = x - rect.left;
    const elementY = y - rect.top;
    
    const element = document.createElement('div');
    
    // Set element properties
    element.classList.add('animation-element');
    
    // Check if it's a letter with an animal emoji
    if (/^[A-Z]$/.test(key) && animals[key]) {
        element.innerHTML = animals[key].emoji;
        element.style.fontSize = '100px'; // Larger for better visibility
        element.style.backgroundColor = 'transparent';
    } else {
        // Determine shape based on key
        const shapeIndex = key.charCodeAt(0) % shapes.length;
        const shape = shapes[shapeIndex];
        
        // Determine color based on key
        const colorIndex = key.charCodeAt(0) % colors.length;
        const color = colors[colorIndex];
        
        // Set element style based on shape and color
        element.style.backgroundColor = color;
        
        if (shape === 'circle') {
            element.style.width = '120px';
            element.style.height = '120px';
            element.style.borderRadius = '50%';
        } else if (shape === 'square') {
            element.style.width = '120px';
            element.style.height = '120px';
        } else if (shape === 'triangle') {
            element.style.width = '0';
            element.style.height = '0';
            element.style.borderLeft = '60px solid transparent';
            element.style.borderRight = '60px solid transparent';
            element.style.borderBottom = '120px solid ' + color;
            element.style.backgroundColor = 'transparent';
        } else if (shape === 'star') {
            element.innerHTML = '★';
            element.style.fontSize = '120px';
            element.style.color = color;
            element.style.backgroundColor = 'transparent';
        } else if (shape === 'heart') {
            element.innerHTML = '❤';
            element.style.fontSize = '120px';
            element.style.color = color;
            element.style.backgroundColor = 'transparent';
        }
    }
    
    // Position element at touch position
    element.style.left = (elementX - 60) + 'px';
    element.style.top = (elementY - 60) + 'px';
    
    // Add random animation class
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    element.classList.add('fade-in', randomAnimation);
    
    // Add element to animation area
    animationArea.appendChild(element);
    
    // Add floating animation
    floatElement(element);
    
    // Make element interactive
    element.addEventListener('click', () => {
        // Play sound when clicked
        playSound(key);
        
        // Add random animation
        const clickAnimation = animations[Math.floor(Math.random() * animations.length)];
        element.classList.remove(...animations);
        element.classList.add(clickAnimation);
        
        // Remove animation class after it completes
        setTimeout(() => {
            element.classList.remove(clickAnimation);
        }, 1000);
    });
    
    // Remove element after animation completes (longer duration for young children)
    setTimeout(() => {
        element.style.opacity = '0';
        setTimeout(() => {
            if (element.parentNode === animationArea) {
                animationArea.removeChild(element);
            }
        }, 500);
    }, 6000); // Longer duration for young children
}

// Float element around
function floatElement(element) {
    // Get current position
    const currentX = parseInt(element.style.left);
    const currentY = parseInt(element.style.top);
    
    // Generate random movement
    const moveX = (Math.random() - 0.5) * 100;
    const moveY = (Math.random() - 0.5) * 100;
    
    // Calculate new position
    const newX = Math.max(0, Math.min(currentX + moveX, window.innerWidth - 120));
    const newY = Math.max(0, Math.min(currentY + moveY, window.innerHeight - 120));
    
    // Animate to new position (slower for young children)
    element.style.transition = 'left 3s ease, top 3s ease';
    element.style.left = newX + 'px';
    element.style.top = newY + 'px';
    
    // Continue floating after a delay
    setTimeout(() => {
        if (element.parentNode) {
            floatElement(element);
        }
    }, 3000); // Slower for young children
}

// Play sound based on key
function playSound(key) {
    // Skip if muted or audio not initialized
    if (isMuted || !audioInitialized) {
        return;
    }
    
    // Choose a random effect sound
    const effectSounds = [sounds.pop, sounds.bounce, sounds.sparkle];
    const randomEffectSound = effectSounds[Math.floor(Math.random() * effectSounds.length)];
    
    // Play the effect sound
    if (randomEffectSound) {
        randomEffectSound.currentTime = 0;
        randomEffectSound.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
    }
    
    // Play specific sound based on key type
    if (/^[A-Z]$/.test(key) && animalSounds[key]) {
        // Play animal sound for letters
        setTimeout(() => {
            animalSounds[key].currentTime = 0;
            animalSounds[key].play().catch(error => {
                console.log('Animal sound playback failed:', error);
            });
        }, 200);
    } else if (/^[0-9]$/.test(key) && numberSounds[key]) {
        // Play number sound for digits
        setTimeout(() => {
            numberSounds[key].currentTime = 0;
            numberSounds[key].play().catch(error => {
                console.log('Number sound playback failed:', error);
            });
        }, 200);
    }
}

// Create confetti effect
function createConfetti() {
    const animationArea = document.getElementById('animation-area');
    
    // Create confetti pieces
    for (let i = 0; i < 30; i++) {
        if (confettiCount >= maxConfetti) {
            // Remove oldest confetti if we've reached the maximum
            const oldConfetti = document.querySelector('.confetti');
            if (oldConfetti) {
                oldConfetti.remove();
                confettiCount--;
            }
        }
        
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = color;
        
        // Random size (larger for better visibility)
        const size = Math.floor(Math.random() * 10) + 10;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // Random position
        const randomX = Math.floor(Math.random() * animationArea.clientWidth);
        confetti.style.left = randomX + 'px';
        confetti.style.top = '-10px';
        
        // Random rotation
        const rotation = Math.floor(Math.random() * 360);
        confetti.style.transform = `rotate(${rotation}deg)`;
        
        // Random fall duration (slower for young children)
        const duration = Math.floor(Math.random() * 3) + 4;
        confetti.style.animation = `confetti-fall ${duration}s linear forwards`;
        
        // Add to animation area
        animationArea.appendChild(confetti);
        confettiCount++;
        
        // Remove after animation completes
        setTimeout(() => {
            if (confetti.parentNode === animationArea) {
                animationArea.removeChild(confetti);
                confettiCount--;
            }
        }, duration * 1000);
    }
}

// Animate background elements
function animateBackgroundElements() {
    backgroundElements.forEach(element => {
        // Add random animation
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        element.classList.remove(...animations);
        element.classList.add(randomAnimation);
        
        // Remove animation class after it completes
        setTimeout(() => {
            element.classList.remove(randomAnimation);
            element.classList.add('float');
        }, 1000);
    });
}



// Handle window resize
function handleWindowResize() {
    // Adjust animation area if needed
    console.log('Window resized');
    
    // Reposition background elements
    repositionBackgroundElements();
}

// Reposition background elements after window resize
function repositionBackgroundElements() {
    const animationArea = document.getElementById('animation-area');
    
    backgroundElements.forEach(element => {
        // Position element randomly in the animation area
        const maxX = animationArea.clientWidth - 60;
        const maxY = animationArea.clientHeight - 60;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        element.style.left = randomX + 'px';
        element.style.top = randomY + 'px';
    });
}

// Create welcome animation
function createWelcomeAnimation() {
    const welcomeText = "Press any key!";
    
    for (let i = 0; i < welcomeText.length; i++) {
        setTimeout(() => {
            const key = welcomeText[i].toUpperCase();
            
            // Display the key
            const keyDisplay = document.getElementById('key-display');
            keyDisplay.textContent = key;
            keyDisplay.style.color = colors[i % colors.length];
            
            // Add random animation
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            keyDisplay.classList.remove(...animations);
            keyDisplay.classList.add(randomAnimation);
            
            // Remove the animation class after animation completes
            setTimeout(() => {
                keyDisplay.classList.remove(randomAnimation);
            }, 1000);
            
            // Create visual element
            createVisualElement(key);
            
            // Play sound
            playSound(key);
            
            // Create confetti for vowels
            if (/^[AEIOU]$/.test(key)) {
                createConfetti();
            }
            
            // Animate background elements
            animateBackgroundElements();
        }, i * 800); // Slower for young children
    }
    
    // Create final confetti burst after welcome animation
    setTimeout(() => {
        createConfetti();
    }, welcomeText.length * 800);
}
