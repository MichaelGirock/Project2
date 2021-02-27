import logo from './logo.svg';
import './App.css';
import { board } from './Board.js';
import { useState } from "react";


export function App() {
  const [board, setBoard] = useState(["NULL", "NULL", "NULL", "NULL", "NULL", "NULL", "NULL", "NULL", "NULL"]);
  
  function XO(space) {
    setBoard( board[space]= 'X')
  }
  return (
    <div className="Change">
    
    <FullBoard myFunctionProp={XO} />
    
    </div>
  );
}

export default App;
