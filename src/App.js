import logo from './logo.svg';
import './App.css';
import { board } from './Board.js';
import { useEffect,useState } from "react";
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

export function App() {
 useEffect(() => {
        socket.on('connect', (user) => {
        console.log(user)
      
    });
  }, []);
}


export default App;
