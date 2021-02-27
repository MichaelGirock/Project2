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
  }, [calculateWinner(board)]);
    
    
    function moved(space) {
        
        const newBoard=board.slice()
          
          
        setCount(count=>{
            setBoard(prevBoard =>{
                let nBoard = prevBoard.slice()
                nBoard[space.space] = (count % 2) ? 'O' : 'X'
                return nBoard
            })
            console.log('COUNT',count)
            if (count==8){
                console.log('DRAW')
            }
            return count+1
            
        })
    }
    
    
    
    function XO(space) {
        console.log('CALLING MOVED XO')
        moved(space)
        socket.emit('board', {space: space.space});
    
    }
    
    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                console.log('WINNER WINNER CHICKEN DINNER')
                if (squares[a]=='X'){
                    console.log('PLAYER1 WINS')
                }else if (squares[a]=='O'){
                    console.log('PLAYER2 WINS')
                }
                return squares[a];
            }
        }
    return null;
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
