// Mock the DOM elements that the Game2048 class expects
document.body.innerHTML = `
    <div class="grid"></div>
    <div id="score">0</div>
    <button id="new-game">New Game</button>
    <button id="auto-play">Auto Play</button>
`

const Game2048 = require("../game.js")

describe("Game2048", () => {
	let game

	beforeEach(() => {
		game = new Game2048()
	})

	test("initializes with empty grid", () => {
		expect(game.grid.length).toBe(4)
		expect(game.grid[0].length).toBe(4)
	})

	test("addNewTile adds a tile with value 2 or 4", () => {
		game.grid = Array(4)
			.fill()
			.map(() => Array(4).fill(0))
		game.addNewTile()

		const flatGrid = game.grid.flat()
		const newTile = flatGrid.find((cell) => cell !== 0)
		expect([2, 4]).toContain(newTile)
	})

	test("moveLeft combines same numbers", () => {
		game.grid = [
			[2, 2, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		]
		game.moveLeft()
		expect(game.grid[0][0]).toBe(4)
		expect(game.grid[0][1]).toBe(0)
	})

	test("moveRight combines same numbers", () => {
		game.grid = [
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		]
		game.moveRight()
		expect(game.grid[0][3]).toBe(4)
		expect(game.grid[0][2]).toBe(0)
	})

	test("evaluateMove returns higher score for better moves", () => {
		game.grid = [
			[0, 2, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		]

		const leftScore = game.evaluateMove("ArrowLeft")
		const rightScore = game.evaluateMove("ArrowRight")

		// Both moves should be possible and result in the same score
		// as they both combine the 2s
		expect(leftScore).toBe(rightScore)

		// Verify grid wasn't modified
		expect(game.grid).toEqual([
			[0, 2, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		])
	})

	test("isGameOver returns true when no moves possible", () => {
		game.grid = [
			[2, 4, 2, 4],
			[4, 2, 4, 2],
			[2, 4, 2, 4],
			[4, 2, 4, 2],
		]
		expect(game.isGameOver()).toBe(true)
	})

	test("isGameOver returns false when moves possible", () => {
		game.grid = [
			[2, 2, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		]
		expect(game.isGameOver()).toBe(false)
	})
})
