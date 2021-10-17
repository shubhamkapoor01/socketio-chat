import React from 'react'
import './Room.css'
import VideoRoom from './VideoRoom.js'
import Chat from './Chat.js'

function Room({ socket, name, room }) {

	return (
		<div className="room">
			<VideoRoom className="videoroom" socket={ socket } name={ name } room={ room } />
			<Chat className="chatroom" socket={ socket } name={ name } room={ room } />
		</div>
	)
}

export default Room