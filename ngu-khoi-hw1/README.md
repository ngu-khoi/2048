# 2048 Game Implementation

## Contributors
- Khoi Nguyen

## Development Notes
### Time Spent
- Approximately 1 hour total development time

### Key Challenges
The most significant challenge encountered was related to AI test case implementation:
- Initial AI-generated test case incorrectly evaluated "optimal moves"
- Test case assumed a forced move would result in a higher score when no change occurred
- Resolution required manual evaluation and recreation of a proper test case with correct evaluation criteria

## Game Description

This is a browser-based version of 2048, where players combine numbered tiles by sliding them in four directions (up, down, left, right). When two tiles with the same number collide, they merge into one tile with the sum of their values. The goal is to create a tile with the number 2048.

### Auto-Play Implementation
The game includes an auto-play feature that demonstrates an AI algorithm which uses a combination of strategies to make optimal moves:

- Analyzes the current board state to identify empty cells and tile positions
- Evaluates possible moves using a scoring system that considers:
  - Keeping high-value tiles in corners
  - Maintaining a monotonic pattern (tiles decreasing in value from corner)
  - Maximizing empty cells for flexibility
  - Preventing tile isolation
- Selects the move with the highest evaluated score
- Executes moves automatically at regular intervals until stopped

## Getting Started

### Prerequisites
- Node.js and npm installed
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation and Setup

1. Navigate to the project directory:
   ```bash
   cd ngu-khoi-hw1/2048
   ```

2. Install all dependencies:
   ```bash
   npm i
   ```

3. Install Express server:
   ```bash
   npm i express
   ```

### Running the Game

1. Start the server:
   ```bash
   npm start
   ```

2. Open in your browser:
   ```
   http://localhost:3000
   ```

### Playing the Game

- Use arrow keys to move tiles
- Click "New Game" to start over
- Click "Auto Play" to toggle AI mode
- Press any arrow key to stop auto-play

### Running Tests

Run the test suite:
```bash
npm test
```

The test suite covers:
- Game initialization (grid size and empty state)
- Tile generation (adding new tiles with values 2 or 4)
- Movement mechanics (left and right tile combining)
- Move evaluation (scoring potential moves)
- Game over detection (checking for possible moves)

## Project Structure
```
2048/
├── index.html      # Game interface
├── styles.css      # Game styling
├── game.js         # Game logic and AI
├── server.js       # Express server
└── __tests__/      # Test files
    ├── game.test.js
    └── setup.js
```
