import logo from './logo.svg';
import './App.css';
import { Board } from './Board.js';
import { useEffect,useState,useRef } from "react";
import io from 'socket.io-client';
import { ListItem } from './ListItem.js';

const socket = io(); // Connects to socket connection


function App(props) {
  const [login, setLogin] = useState(false); // State variable, list of messages
  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState("");
  const inputRef = useRef(null);
  
  let button;
  let input;
  
  useEffect(() => {
        console.log('USE EFFECT IN EFFECT')
        socket.on('login', (userList) => {
        console.log(userList)
        setUsers(userList)
        
    });
  }, []);
  
  function handleLoginClick() {
    let type = "spectator";
    if (inputRef != null) {
    }
      const tempCurrUser=inputRef.current.value
      console.log(inputRef.current.value)
      
      setCurrUser(tempCurrUser)
      socket.emit('login', tempCurrUser);
      setLogin(true);
  }

  function handleLogoutClick() {
    setLogin(false);
  }
  
  

  if (login) {

  } else {
    input = <input type="text" ref={ inputRef } />
    button = <LoginButton onClick={ handleLoginClick } />;
  }

  return (
    <div className="App">
      <LoginScreen login={login} username = {currUser} users = {users}/>
      {input}
      {button}
    </div>
  );


function LoginScreen(props) {
  const login = props.login;
  if (login) {
    return ( <div> 
      <Board userList={users} currUser={currUser}/>
    </div>
    );
  }
  return <h1>Enter Username</h1>;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}


}
export default App;