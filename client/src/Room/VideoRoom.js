import React, { useState, useEffect } from 'react'
import './VideoRoom.css'
import Sketch from 'react-p5';

function VideoRoom({ socket, name, room }) {
	const [videoGrid, setVideoGrid] = useState([]);
	const [myVideo, setMyVideo] = useState({});
	const [users, setUsers] = useState([]);

	useEffect(() => {
		socket.on('receive-move', (data) => {
			setUsers(data);
		})
	}, [socket]);

	let setup = (p5, canvas) => {
		let canv = p5.createCanvas(800, 800).parent(canvas);
		let tempUsers = [];
		tempUsers.push({
			id: socket.id,
			room: room,
			x: 400,
			y: 100
		});
		
		setUsers(tempUsers);
	}

	let draw = (p5) => {
		p5.background("rgb(255, 255, 255)");

		let idx = users.findIndex((user) => user.id === socket.id)
		if (idx !== -1) {
			let tempUsers = users;

			if (p5.keyIsDown(87) || p5.keyIsDown(38)) {
				tempUsers[idx].y = tempUsers[idx].y - 2;
			}
			if (p5.keyIsDown(65) || p5.keyIsDown(37)) {
				tempUsers[idx].x = tempUsers[idx].x - 2;
			}
			if (p5.keyIsDown(83) || p5.keyIsDown(40)) {
				tempUsers[idx].y = tempUsers[idx].y + 2;
			}
			if (p5.keyIsDown(68) || p5.keyIsDown(39)) {
				tempUsers[idx].x = tempUsers[idx].x + 2;
			}	
			
			setUsers(tempUsers);
			let data = {
				id: socket.id,
				room: room,
				x: tempUsers[idx].x,
				y: tempUsers[idx].y	
			}
			socket.emit('send-move', data);
		}
		for (let i = 0; i < users.length; i ++) {
			p5.circle(users[i].x, users[i].y, 16);
		}
	}

	return (
		<div className="video">
			<Sketch setup={ setup } draw={ draw } className="canvas" />
		</div>
	)
}

export default VideoRoom