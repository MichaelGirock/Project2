pip install Project2

After installing the Project2 files
  Open 2 terminals
    In terminal 1, run:
        cd react-starter
        python app.py
    In terminal 2, run:
        cd react-starter
        npm run start
  
  If your in Cloud9, preview windows to be able to see the game (pop out and duplicate tabs to play against yourself)


Known Problems:

  After Player 1 and 2 start new game, specator is stuck with the old game but updating as 1&2 play
  -This can be changed by updating spectators board

  If player 1 clicks play again and makes move before player 2 clicks play again, doesnt update their board
  -This can be fixed by making player1 wait for player2's play again

  If player 1 Clicks already clicked box, will count as a turn
  -This can be fixed by making if the varible in the array doesnt change, then the counter wouldnt change (counter keeps track of whose turn it is)
  
  
  Technical Problems:
  
    I had alot of problems transversing data from Board.js to App.js, I had to rewatch the lectures, look up youtube vids and ask classmates on how to uses props properly
    
    Making a Userlist in app.py, was something i didnt think of, and was giving the idea from slack, this allowed it to be server side
