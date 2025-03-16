class WhackAMole {
    constructor() {
        this.score = 0;
        this.gameTime = 30;
        this.isPlaying = false;
        this.baseInterval = 1000; // Base interval in milliseconds
        this.minInterval = 400;   // Minimum interval (max speed)
        this.speedMultiplier = 1;
        this.holes = document.querySelectorAll('.hole');
        this.scoreDisplay = document.getElementById('score');
        this.timerDisplay = document.getElementById('timer');
        this.startButton = document.getElementById('startButton');
        this.gameOverModal = new bootstrap.Modal(document.getElementById('gameOver'));
        this.finalScoreDisplay = document.getElementById('finalScore');
        this.sound = new GameSound();

        this.bindEvents();
    }

    bindEvents() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.holes.forEach(hole => {
            hole.addEventListener('click', () => this.whack(hole));
        });
    }

    startGame() {
        if (this.isPlaying) return;

        this.sound.playGameStart();
        this.isPlaying = true;
        this.score = 0;
        this.speedMultiplier = 1;
        this.scoreDisplay.textContent = this.score;
        this.startButton.disabled = true;

        this.updateGameSpeed();
        this.startTimer();
    }

    updateGameSpeed() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }

        // Calculate current interval based on speed multiplier
        const currentInterval = Math.max(
            this.minInterval,
            this.baseInterval / this.speedMultiplier
        );

        this.gameLoop = setInterval(() => this.showMole(), currentInterval);
    }

    startTimer() {
        let timeLeft = this.gameTime;
        this.timerDisplay.textContent = timeLeft;

        this.timer = setInterval(() => {
            timeLeft--;
            this.timerDisplay.textContent = timeLeft;

            // Increase speed every 5 seconds
            if (timeLeft % 5 === 0 && timeLeft > 0) {
                this.speedMultiplier += 0.2;
                this.updateGameSpeed();
            }

            if (timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    showMole() {
        const activeHoles = document.querySelectorAll('.hole.active');
        activeHoles.forEach(hole => hole.classList.remove('active'));

        const randomHole = this.holes[Math.floor(Math.random() * this.holes.length)];
        randomHole.classList.add('active');

        // Hide mole after a duration proportional to the current speed
        const hideDuration = Math.max(300, 800 / this.speedMultiplier);
        setTimeout(() => {
            if (this.isPlaying) {
                randomHole.classList.remove('active');
            }
        }, hideDuration);
    }

    whack(hole) {
        if (!this.isPlaying) return;

        if (hole.classList.contains('active')) {
            this.score++;
            this.scoreDisplay.textContent = this.score;
            hole.classList.remove('active');
            this.sound.playSuccess();
        } else {
            this.score = Math.max(0, this.score - 2); // Deduct 2 points but don't go below 0
            this.scoreDisplay.textContent = this.score;
            this.sound.playMiss();
        }
    }

    endGame() {
        this.isPlaying = false;
        clearInterval(this.gameLoop);
        clearInterval(this.timer);

        this.holes.forEach(hole => hole.classList.remove('active'));
        this.startButton.disabled = false;
        this.finalScoreDisplay.textContent = this.score;
        this.sound.playGameOver();
        this.gameOverModal.show();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WhackAMole();
});