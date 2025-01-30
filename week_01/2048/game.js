class Game2048 {
	constructor() {
		this.grid = Array(4)
			.fill()
			.map(() => Array(4).fill(0))
		this.score = 0
		this.gridElement = document.querySelector(".grid")
		this.scoreElement = document.getElementById("score")
		this.init()
	}

	init() {
		// Create grid cells
		for (let i = 0; i < 16; i++) {
			const cell = document.createElement("div")
			cell.classList.add("cell")
			this.gridElement.appendChild(cell)
		}

		// Add new game button listener
		document
			.getElementById("new-game")
			.addEventListener("click", () => this.newGame())

		// Add keyboard controls
		document.addEventListener("keydown", (e) => this.handleInput(e))

		this.newGame()
	}

	newGame() {
		// Reset grid and score
		this.grid = Array(4)
			.fill()
			.map(() => Array(4).fill(0))
		this.score = 0
		this.scoreElement.textContent = "0"

		// Add initial tiles
		this.addNewTile()
		this.addNewTile()
		this.updateDisplay()
	}

	addNewTile() {
		const emptyCells = []
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (this.grid[i][j] === 0) {
					emptyCells.push({ x: i, y: j })
				}
			}
		}

		if (emptyCells.length > 0) {
			const randomCell =
				emptyCells[Math.floor(Math.random() * emptyCells.length)]
			this.grid[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4
		}
	}

	updateDisplay() {
		const cells = document.querySelectorAll(".cell")
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				const value = this.grid[i][j]
				const cell = cells[i * 4 + j]
				cell.textContent = value || ""
				cell.setAttribute("data-value", value)
			}
		}
	}

	handleInput(e) {
		let moved = false
		const oldGrid = JSON.parse(JSON.stringify(this.grid))

		switch (e.key) {
			case "ArrowUp":
				moved = this.moveUp()
				break
			case "ArrowDown":
				moved = this.moveDown()
				break
			case "ArrowLeft":
				moved = this.moveLeft()
				break
			case "ArrowRight":
				moved = this.moveRight()
				break
			default:
				return
		}

		if (moved) {
			this.addNewTile()
			this.updateDisplay()

			if (this.isGameOver()) {
				alert("Game Over! Your score: " + this.score)
				this.newGame()
			}
		}
	}

	moveLeft() {
		let moved = false
		for (let i = 0; i < 4; i++) {
			let row = this.grid[i].filter((cell) => cell !== 0)
			for (let j = 0; j < row.length - 1; j++) {
				if (row[j] === row[j + 1]) {
					row[j] *= 2
					this.score += row[j]
					row.splice(j + 1, 1)
					moved = true
				}
			}
			const newRow = row.concat(Array(4 - row.length).fill(0))
			if (newRow.join(",") !== this.grid[i].join(",")) {
				moved = true
			}
			this.grid[i] = newRow
		}
		this.scoreElement.textContent = this.score
		return moved
	}

	moveRight() {
		let moved = false
		for (let i = 0; i < 4; i++) {
			let row = this.grid[i].filter((cell) => cell !== 0)
			for (let j = row.length - 1; j > 0; j--) {
				if (row[j] === row[j - 1]) {
					row[j] *= 2
					this.score += row[j]
					row.splice(j - 1, 1)
					moved = true
				}
			}
			const newRow = Array(4 - row.length)
				.fill(0)
				.concat(row)
			if (newRow.join(",") !== this.grid[i].join(",")) {
				moved = true
			}
			this.grid[i] = newRow
		}
		this.scoreElement.textContent = this.score
		return moved
	}

	moveUp() {
		let moved = false
		for (let j = 0; j < 4; j++) {
			let column = []
			for (let i = 0; i < 4; i++) {
				if (this.grid[i][j] !== 0) {
					column.push(this.grid[i][j])
				}
			}
			for (let i = 0; i < column.length - 1; i++) {
				if (column[i] === column[i + 1]) {
					column[i] *= 2
					this.score += column[i]
					column.splice(i + 1, 1)
					moved = true
				}
			}
			const newColumn = column.concat(Array(4 - column.length).fill(0))
			for (let i = 0; i < 4; i++) {
				if (this.grid[i][j] !== newColumn[i]) {
					moved = true
				}
				this.grid[i][j] = newColumn[i]
			}
		}
		this.scoreElement.textContent = this.score
		return moved
	}

	moveDown() {
		let moved = false
		for (let j = 0; j < 4; j++) {
			let column = []
			for (let i = 0; i < 4; i++) {
				if (this.grid[i][j] !== 0) {
					column.push(this.grid[i][j])
				}
			}
			for (let i = column.length - 1; i > 0; i--) {
				if (column[i] === column[i - 1]) {
					column[i] *= 2
					this.score += column[i]
					column.splice(i - 1, 1)
					moved = true
				}
			}
			const newColumn = Array(4 - column.length)
				.fill(0)
				.concat(column)
			for (let i = 0; i < 4; i++) {
				if (this.grid[i][j] !== newColumn[i]) {
					moved = true
				}
				this.grid[i][j] = newColumn[i]
			}
		}
		this.scoreElement.textContent = this.score
		return moved
	}

	isGameOver() {
		// Check for empty cells
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (this.grid[i][j] === 0) {
					return false
				}
			}
		}

		// Check for possible merges
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (
					(i < 3 && this.grid[i][j] === this.grid[i + 1][j]) ||
					(j < 3 && this.grid[i][j] === this.grid[i][j + 1])
				) {
					return false
				}
			}
		}

		return true
	}
}

// Initialize the game
new Game2048()
