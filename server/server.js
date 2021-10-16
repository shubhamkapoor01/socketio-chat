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
		methods: ["GET", "POST"],
	},
})

var users = [];
function user(room, id, x, y) {
	this.room = room;
	this.id = id;
	this.x = x;
	this.y = y;	
}

io.on('connection', (socket) => {

	socket.on('join-room', (data) => {
		var tempUser = new user(data.room, socket.id, 400, 100);
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
		socket.to(data.room).emit('receive-move', users)
	})

	socket.on('disconnect', () => {

	})
})

server.listen(3001, () => {
	console.log("server running on port 3001")
})