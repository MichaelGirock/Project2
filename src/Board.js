import React from 'react';
import './Board.css';
import { useState, useEffect } from "react";
import Box from './Box.js'
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection
let counter=0
let move='X'

function Board(props){
    const [board, setBoard] = useState(['','','','','','','','','']);
    const [count, setCount] = useState(0);
    useEffect(() => {
        socket.on('board', (space) => {
        console.log('CALLING MOVED USEEFFECT')
        moved(space)
      
    });
  }, []);
    
    
    function moved(space) {
        const newBoard=board.slice()
          
          
        setCount(count=>{
            setBoard(prevBoard =>{
                let nBoard = prevBoard.slice()
                nBoard[space.space] = (count % 2) ? 'O' : 'X'
                return nBoard
            })
            return count+1
        })
        
        console.log('Counter: ', count)
        console.log('Board:', board)
    }
    
    
    
    function XO(space) {
        console.log('CALLING MOVED XO')
        moved(space)
        socket.emit('board', {space: space.space});
    
    }

 
    const item = board.map((v, indx) => 
        <Box className="box" mark={board[indx]} key={indx} onclick={() => XO({space:indx})}/>
    )
    


    
    return(
            
            <div className="board">
             {item}
            </div>
 
    

    )
}


export default Board;
