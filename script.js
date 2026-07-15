document.addEventListener('DOMContentLoaded', function () {
    // Age Verification Logic
    const ageVerification = document.getElementById('ageVerification');
    const ageInput = document.getElementById('ageInput');
    const verifyBtn = document.getElementById('verifyBtn');
    const startOverlay = document.getElementById('startOverlay');
    
    // YouTube redirect URL (you can change this)
    const redirectURL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Change this to your YouTube video
    
    verifyBtn.addEventListener('click', function() {
        const age = parseInt(ageInput.value);
        
        if (isNaN(age) || age === 0) {
            // Shake the input field if empty
            ageInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                ageInput.style.animation = '';
            }, 500);
            return;
        }
        
        if (age === 21) {
            // Correct answer! Show start celebration
            ageVerification.style.opacity = '0';
            setTimeout(() => {
                ageVerification.style.display = 'none';
                startOverlay.style.display = 'flex';
                startOverlay.style.opacity = '0';
                setTimeout(() => {
                    startOverlay.style.opacity = '1';
                }, 10);
            }, 500);
        } else {
            // Wrong answer! Redirect to YouTube directly
            window.location.href = redirectURL;
        }
    });
    
    // Allow Enter key to submit
    ageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyBtn.click();
        }
    });

    const candlesContainer = document.getElementById('candles');
    const blowArea = document.getElementById('blowArea');

    // Initially hide candles and disable interaction
    candlesContainer.style.opacity = '0';
    blowArea.style.pointerEvents = 'none';

    // Create 9 candles with flames
    for (let i = 0; i < 9; i++) {
        const candle = document.createElement('div');
        candle.className = 'velas';
        candle.style.opacity = '0';

        // Create 5 flames for each candle
        for (let j = 0; j < 5; j++) {
            const flame = document.createElement('div');
            flame.className = 'fuego';
            candle.appendChild(flame);
        }

        candlesContainer.appendChild(candle);
    }

    // Wait for the final cake animation to complete
    const cremaAnimation = document.getElementById('crema');
    cremaAnimation.addEventListener('endEvent', function () {
        // Show candles container
        candlesContainer.style.opacity = '1';

        // Animate candles one by one
        const candles = document.querySelectorAll('.velas');
        candles.forEach((candle, index) => {
            setTimeout(() => {
                candle.style.animation = `candle-appear 0.4s ease-out forwards`;
                candle.style.animationDelay = `${index * 0.15}s`;
            }, 0);
        });

        // Enable interaction after all candles appear
        setTimeout(() => {
            blowArea.style.pointerEvents = 'auto';
        }, candles.length * 150 + 400);
    });

    let blownCandles = 0;
    const totalCandles = 9;

    // Detect blowing (mouse click or touch)
    blowArea.addEventListener('click', blowCandles);
    blowArea.addEventListener('touchstart', blowCandles);

    function blowCandles() {
        if (blownCandles >= totalCandles) return;
        blownCandles = totalCandles;

        // Stop the opening recording when candles are blown
        if (openingRecording) {
            openingRecording.pause();
            openingRecording.currentTime = 0;
        }

        // Disable further clicks during animation
        blowArea.style.pointerEvents = 'none';

        // Group flames by candle for more realistic blowing
        const candles = document.querySelectorAll('.velas');

        candles.forEach((candle, candleIndex) => {
            const flames = candle.querySelectorAll('.fuego');

            // Add a slight delay between candles (shorter than before)
            setTimeout(() => {
                // First make the flame flicker
                flames.forEach(flame => {
                    flame.style.animation = 'flicker 0.2s 2 alternate';
                });

                // Then extinguish after flickering
                setTimeout(() => {
                    flames.forEach(flame => {
                        flame.style.opacity = '0';
                        flame.style.transform = 'scale(0)';
                        flame.style.transition = 'all 0.1s ease-out';
                    });
                }, 400);

            }, candleIndex * 50); // Reduced delay between candles
        });

        // Start confetti after all candles are blown
        setTimeout(createConfetti, candles.length * 80 + 500);

        // Update instructions
        setTimeout(() => {
            document.querySelector('.instructions').textContent = "Now your wish will come true!";
        }, candles.length * 80 + 300);
    }

    function createConfetti() {
        const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#ff8800', '#ff0088', '#8800ff'];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            confetti.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }

        setTimeout(onConfettiEnd, 3000);
    }
});

function onConfettiEnd() {
    document.getElementById('gifContainer').style.display = 'block';
    
    // Show gift box after a short delay
    setTimeout(() => {
        document.getElementById('giftBox').style.display = 'block';
    }, 2000);
}

// Audio Player
const backgroundMusic = document.getElementById('backgroundMusic');
const openingRecording = document.getElementById('openingRecording');
let isPlaying = false;

// Gift Box Click Handler
document.addEventListener('DOMContentLoaded', function () {
    const startOverlay = document.getElementById('startOverlay');
    const startBtn = document.getElementById('startBtn');
    const blowArea = document.getElementById('blowArea');
    
    // Initially disable blow area
    blowArea.style.pointerEvents = 'none';
    
    // Start button click - plays recording and hides overlay
    startBtn.addEventListener('click', function() {
        // Play the opening recording
        openingRecording.play();
        
        // Fade out and hide overlay
        startOverlay.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            startOverlay.style.display = 'none';
        }, 500);
    });
    
    const giftBox = document.getElementById('giftBoxClickable');
    const modal = document.getElementById('giftModal');
    const closeButton = document.querySelector('.close-button');
    
    // Music modal and controls
    const musicModal = document.getElementById('musicModal');
    const closeMusicBtn = document.getElementById('closeMusicBtn');
    const pausePlayBtn = document.getElementById('pausePlayBtn');
    const stopMusicBtn = document.getElementById('stopMusicBtn');

    // Open gift box - this now plays music automatically!
    giftBox.addEventListener('click', function() {
        // Add opening animation
        this.classList.add('opening');
        
        // Start playing music
        backgroundMusic.play();
        isPlaying = true;
        
        // Show gift modal after opening animation
        setTimeout(() => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Show music controls modal briefly
            musicModal.style.display = 'block';
            pausePlayBtn.textContent = '⏸️ Pause';
            
            // Auto-hide music controls after 3 seconds
            setTimeout(() => {
                musicModal.style.display = 'none';
            }, 3000);
        }, 600);
    });

    // Close gift modal (music keeps playing)
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === musicModal) {
            musicModal.style.display = 'none';
        }
    });

    // Close music modal (keeps music playing)
    closeMusicBtn.addEventListener('click', function() {
        musicModal.style.display = 'none';
    });

    // Pause/Play toggle
    pausePlayBtn.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            pausePlayBtn.textContent = '▶️ Play';
            isPlaying = false;
        } else {
            backgroundMusic.play();
            pausePlayBtn.textContent = '⏸️ Pause';
            isPlaying = true;
        }
    });

    // Stop music
    stopMusicBtn.addEventListener('click', function() {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        isPlaying = false;
        pausePlayBtn.textContent = '▶️ Play';
        musicModal.style.display = 'none';
    });
    
    // Add click to reopen music controls
    document.addEventListener('keydown', function(event) {
        // Press 'M' to show music controls
        if (event.key === 'm' || event.key === 'M') {
            if (isPlaying) {
                musicModal.style.display = 'block';
            }
        }
    });
    
    // Envelope click handlers
    const envelopeContainers = document.querySelectorAll('.envelope-container');
    envelopeContainers.forEach(container => {
        container.addEventListener('click', function() {
            this.classList.toggle('opened');
        });
    });
});
