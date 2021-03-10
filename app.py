import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
app = Flask(__name__, static_folder='./build/static')

cors = CORS(app, resources={r"/*": {"origins": "*"}})

load_dotenv(find_dotenv())

# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
userlist = []
@socketio.on('login')
def on_connect(user):
    print(user, ' connected!')
    userlist.append(user)
    new_user=LeaderBoard(username=user, points=100)
    db.session.add(new_user)
    db.session.commit()
    #db.session.add(newuser)
    all_Leaders = LeaderBoard.query.all()
    
    leadersList=[]
    points=[]
    for leader in all_Leaders:
        leadersList.append(leader.username)
        points.append(leader.points)

    print ('CURRENT USER: ', leader)
    print('LEADER BOARD: ', leadersList)
    print("this is running\n"*100)
    print('CURRENT USERS POINTS: ', leader.points)
    socketio.emit('leader_List', leadersList, broadcast=True, include_self=True)

    socketio.emit ('login', userlist, broadcast=True, include_self=True)

@socketio.on('gameover')
def on_gameover(winner,loser):
    print(winner)
    print(loser)
    all_Leaders = LeaderBoard.query.all()
    for leader in all_Leaders:
        leaderName=leader.username
        if (leaderName == winner):
            winner_points=leader.points
            print(winner_points)
            winner_points=winner_points+1
            leader.points=winner_points
            db.session.commit()
            print(leader.points)
        
# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')
    
    
@socketio.on('logout')
def on_logout(user):
    userlist.clear()
    print (userlist)
    print('User Logged out!')
    socketio.emit ('login', userlist, broadcast=True, include_self=True)
    
        

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('chat')
def on_chat(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('chat',  data, broadcast=True, include_self=False)
    
@socketio.on('board')
def on_move(board):
    print(str(board))
    socketio.emit('board',  board, broadcast=True, include_self=False)

# Note that we don't call app.run anymore. We call socketio.run with app arg
if __name__ == "__main__":
    from models import LeaderBoard
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8088)),
    )