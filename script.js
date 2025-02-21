let breakLength = 5;
let sessionLength = 25;
let timeLeft = sessionLength * 60;
let timerInterval;
let isRunning = false;
let isSession = true;

const breakLengthElement = document.getElementById('break-length');
const sessionLengthElement = document.getElementById('session-length');
const timeLeftElement = document.getElementById('time-left');
const timerLabelElement = document.getElementById('timer-label');
const startStopButton = document.getElementById('start_stop');
const resetButton = document.getElementById('reset');
const beep = document.getElementById('beep');

// Update break length
document.getElementById('break-decrement').addEventListener('click', () => {
    if (breakLength > 1) {
        breakLength--;
        breakLengthElement.textContent = breakLength;
    }
});

document.getElementById('break-increment').addEventListener('click', () => {
    if (breakLength < 60) {
        breakLength++;
        breakLengthElement.textContent = breakLength;
    }
});

// Update session length
document.getElementById('session-decrement').addEventListener('click', () => {
    if (sessionLength > 1) {
        sessionLength--;
        sessionLengthElement.textContent = sessionLength;
        if (!isRunning) {
            timeLeft = sessionLength * 60;
            updateTimeLeft();
        }
    }
});

document.getElementById('session-increment').addEventListener('click', () => {
    if (sessionLength < 60) {
        sessionLength++;
        sessionLengthElement.textContent = sessionLength;
        if (!isRunning) {
            timeLeft = sessionLength * 60;
            updateTimeLeft();
        }
    }
});

// Start/Stop timer
startStopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    } else {
        isRunning = true;
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimeLeft();
            if (timeLeft < 0) {
                beep.play();
                if (isSession) {
                    isSession = false;
                    timerLabelElement.textContent = 'Break';
                    timeLeft = breakLength * 60;
                } else {
                    isSession = true;
                    timerLabelElement.textContent = 'Session';
                    timeLeft = sessionLength * 60;
                }
            }
        }, 1000);
    }
});

// Reset timer
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    breakLength = 5;
    sessionLength = 25;
    timeLeft = sessionLength * 60;
    isSession = true;
    breakLengthElement.textContent = breakLength;
    sessionLengthElement.textContent = sessionLength;
    timerLabelElement.textContent = 'Session';
    updateTimeLeft();
    beep.pause();
    beep.currentTime = 0;
});

// Helper function to update time display
function updateTimeLeft() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeLeftElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${
        seconds < 10 ? '0' : ''
    }${seconds}`;
}
