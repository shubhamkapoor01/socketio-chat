const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const { v4: uuidV4 } = require('uuid')

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
})

var users = [];

io.on('connection', (socket) => {

	socket.on('join-room', (data) => {
		var tempUser = { room: data, id: socket.id, x: 400, y: 100 };
		users.push(tempUser);
		socket.join(data);
	})

	socket.on('send-message', (data) => {
		socket.to(data.room).emit('receive-message', data)
	})

	socket.on('send-move', (data) => {
		var user;
		for (var i = 0; i < users.length; i++) {
			if (socket.id === users[i].id) {
				user = users[i];
			}
		}
		user.x = data.x;
		user.y = data.y;
		let roomUsers = users.filter(user => user.room === data.room);
		socket.to(data.room).emit('receive-move', roomUsers);
	})

	socket.on('disconnect', (data) => {
		let idx = users.findIndex(user => user.id === socket.id);
		let room = users[idx].room;
		users[idx].room = -1;
		let roomUsers = users.filter(user => user.room === room);
		console.log(roomUsers);
		socket.emit('receive-move', roomUsers);
	})
})

server.listen(3001, () => {
	console.log("server running on port 3001")
})