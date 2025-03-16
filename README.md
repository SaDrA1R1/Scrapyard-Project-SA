# Whack-a-Mole Game

A fun browser-based whack-a-mole game with sound effects and increasing difficulty!

## Game Structure

The game is built using the following files:

```
├── static/
│   ├── js/
│   │   ├── game.js      # Main game logic and mechanics
│   │   └── sound.js     # Sound effect management
│   ├── css/
│   │   └── style.css    # Game styling and animations
│   └── images/
│       └── mole.svg     # Mole character graphic
├── templates/
│   └── index.html       # Main game interface
└── app.py              # Flask server setup
```

### Key Features
- Scoring system (gain 1 point for hits, lose 2 for misses)
- Sound effects for hits, misses, and game events
- Gradually increasing difficulty
- 30-second game rounds
- Responsive design for different screen sizes

### How It Works
1. The game starts when you click the "Start Game" button
2. Moles appear randomly in the holes
3. Click the moles to score points
4. Missing a mole deducts 2 points
5. The game speeds up every 5 seconds
6. After 30 seconds, your final score is displayed
