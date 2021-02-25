import React from 'react';
import './Board.css';
import { useState, useEffect } from "react";
import Box from './Box.js'
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

function Board(props){
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  
    //  function onClickBox() {
    //     console.log('TEST')
    //     socket.emit('board', {board: board});
    // }
    
     useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('board', (space) => {
      console.log(space.space);
      console.log(board)
      const newBoard=board.slice()
      newBoard[space.space]='X'
      
      setBoard(newBoard)
      console.log(newBoard)
      console.log(board)
      
      
    });
  }, []);
    
    function XO(space) {
        const newBoard=board.slice()
        newBoard[space]='X'
        setBoard(newBoard)
        //onClickBox()
        console.log('TEST')
        socket.emit('board', {space: space});
    }

 
    const item = board.map((v, indx) => 
        <Box className="box" mark={board[indx]} key={indx} onclick={() => XO(indx)}/>
    )
    


    
    return(
            
            <div className="board">
             {item}
            </div>
 
    

    )
}


export default Board;
