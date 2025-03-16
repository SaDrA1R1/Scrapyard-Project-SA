class WhackAMole {
    constructor() {
        this.score = 0;
        this.gameTime = 30;
        this.isPlaying = false;
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
        this.scoreDisplay.textContent = this.score;
        this.startButton.disabled = true;

        this.gameLoop = setInterval(() => this.showMole(), 1000);
        this.startTimer();
    }

    startTimer() {
        let timeLeft = this.gameTime;
        this.timerDisplay.textContent = timeLeft;

        this.timer = setInterval(() => {
            timeLeft--;
            this.timerDisplay.textContent = timeLeft;

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

        setTimeout(() => {
            if (this.isPlaying) {
                randomHole.classList.remove('active');
            }
        }, 800);
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