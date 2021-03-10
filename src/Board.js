import React from 'react';
import './Board.css';
import { useState, useEffect } from "react";
import Box from './Box.js'
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection



export function Board(props){
    const [board, setBoard] = useState(['','','','','','','','','']);
    const [count, setCount] = useState(0);
    const [gameover, setGameOver]=useState(false);
    const [isShown, setShown]= useState(false)
    const [leaderBoard, setLeaderBoard]=useState([]);
    
    let winner=''
    
    useEffect(() => {
        socket.on('board', (space) => {
            console.log('CALLING MOVED USEEFFECT')
            moved(space)
          
        });
        
        socket.on('leader_List', (data) => {
            console.log('leaderList in useEffect: ',data)
            setLeaderBoard(data)

          
         });
         console.log('LEADERLIST after useEffect: ',leaderBoard)
  }, []);
    
    
    function moved(space) {
        
        const newBoard=board.slice()
          
          
        setCount(count=>{
            setBoard(prevBoard =>{
                let nBoard = prevBoard.slice()
                nBoard[space.space] = (count % 2) ? 'O' : 'X'
                calculateWinner(nBoard)
                return nBoard
            })
            console.log('COUNT',count)
            if (count==8){
                console.log('DRAW')
                setGameOver(true)
                
            }
            return count+1
            
        })
        
    }
    
    
    
    function XO(space) {
        console.log('CALLING MOVED XO')
        
        
            if (props.userList.slice(0,2).find(u => u==props.currUser)){
                if (count% 2 === 0 & props.currUser==props.userList[0]){
                    moved(space)
                    socket.emit('board', {space: space.space});
                }else if (count% 2 !== 0 & props.currUser==props.userList[1]){
                    moved(space)
                    socket.emit('board', {space: space.space});
                    
                }
            }
        
        
    }
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    function showLeaderBoard(){
        setShown((prevShown)=> {
            return !prevShown
        })

    }
    
    
    function leaderBoardNames(){
        console.log('function is Working')

            console.log('leadersList in function: ', leaderBoard);

            return (
            leaderBoard
    )
    }
    
    function leaderBoardScore(){
    //     let scoreList=[]
    //     for (let i=0; i < props.points.length; i++){
    //         scoreList.append(props.points[i])
    //     }
    //         return (
    //         scoreList
    // )
    }
    
    
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    function endGame(){
        if (gameover && (props.currUser==props.userList[0] || props.currUser==props.userList[1])){
            return(<button onClick={playAgain}>
                Play Again?
            </button>)
        }
        
    }
    
    function playAgain(){
        //socket.emit('logout', props.currUser)
        setBoard(['','','','','','','','','']);
        setCount(0);
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
                if (squares[a]=='X'){
                    console.log(props.userList[0] + ' WINS')
                    winner = (props.userList[0] + ' WINS')
                    setGameOver(true)
                    socket.emit('gameover', props.userList[0], props.userList[1])
                    
                }else if (squares[a]=='O'){
                    console.log(props.userList[1] + ' WINS')
                    winner = (props.userList[1] + ' WINS')
                    setGameOver(true)
                    console.log('HELLO?')
                    socket.emit('gameover', props.userList[1], props.userList[0])
                    
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
            <div>
            <div className="board">
             {item}
            
            </div>
            {setGameOver === true ?
                <div> {winner} </div> : null
            }
            <br/>
            <br/>
            <br/>
             Player 1: 
            {props.userList[0]}
            <br/>
            Player 2: 
            {props.userList[1]}
            <br/>
            <br/>
            
            Spectators: 
            {props.userList.slice(2).join(", ")}
            <br/>
            <br/>
            <button onClick={() => showLeaderBoard()}>Leader Board</button>
            <br/>
            <br/>
            {endGame()}
            <br/>
            <br/>
            {isShown === true ? 
            <table>
                <thead>
                    <tr>
                        <th colspan="2">Leaders</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{
                            leaderBoard.map((item) => {
                                return <div>{item}</div>
                            })
                        }</td>
                        <td>{leaderBoardScore()}</td>
                    </tr>
                </tbody>
            </table> : null}
            </div>

    )
}


export default Board;
