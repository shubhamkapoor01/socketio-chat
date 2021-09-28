const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "HEAD", "OPTIONS"],
	},
})

io.on('connection', (socket) => {
	console.log(socket.id, ' has connected')

	socket.on('disconnect', () => {
		console.log(socket.id, ' has disconnected')
	})
})

server.listen(3001, () => {
	console.log("server running on port 3001")
})