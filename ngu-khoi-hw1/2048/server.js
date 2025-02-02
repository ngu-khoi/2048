const express = require("express")
const path = require("path")
const app = express()
const port = 3000

// Serve static files from current directory
app.use(express.static(__dirname))

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(port, () => {
	console.log(`2048 game running at http://localhost:${port}`)
})
