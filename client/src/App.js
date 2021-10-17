import React, { useState } from 'react'
import './App.css';
import io from 'socket.io-client';
import Room from './Room/Room.js'

const socket = io.connect("http://localhost:3001")

function App() {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [chat, setChat] = useState(false)

  const joinRoom = (e) => {
    e.preventDefault()
    if (name === "" || room === "") {
      alert("Please enter valid values")
      return
    }

    socket.emit('join-room', room)
    document.getElementById("input-name").value = ""
    document.getElementById("input-room").value = ""
    setChat(true)
  }

  return (
    <div className="app">
      { !chat ? (
        <div className="box">
          <h1> Enter Room Details </h1>
          <input id="input-name" type="text" placeholder="Enter Your Name..." onChange={ (e) => setName(e.target.value) }/>
          <input id="input-room" type="text" placeholder="Enter Room ID..." onChange={ (e) => setRoom(e.target.value) }/>
          <button type="submit" onClick={ (e) => joinRoom(e) }> Join </button>
        </div>
      ) : (
        <Room socket={ socket } name={ name } room={ room } /> 
      )}
    </div>
  );
}

export default App;