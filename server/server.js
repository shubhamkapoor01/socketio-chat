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

	socket.on('join-room', (data) => {
		socket.join(data)
		console.log(socket.id, ' has joined the room ', data)
	})

	socket.on('send-message', (data) => {
		socket.to(data.room).emit('receive-message', data)
	})

	socket.on('disconnect', () => {
	})
})

server.listen(3001, () => {
	console.log("server running on port 3001")
})