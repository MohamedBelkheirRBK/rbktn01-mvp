// var Game = require('../db/game.js');
// var User = require('../db/user.js');

var activeGames = {};
var queueOfPlayers = {};

function createGame(player1, player2) {
  console.log("creating game for", player1, player2)
  var newGame = {
    player1,
    player2,
    turn: player1,
    isOver: false,
    board: [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ]
  }

  activeGames[player1] = newGame;
  activeGames[player2] = newGame;

}

function handleTurn() {

}

function matching(user) {
  var opponent = "";
  for(var player in queueOfPlayers) {
    console.log(player)
    if(player !== user){
      opponent = player;
      break;
    }
  }
  if(opponent !== "") {
    return createGame(user, opponent)
  }
  return false;
}

function addToQueue(user) {
  console.log(user, "Has been added to the queue")
  queueOfPlayers[user] = true;
}


//-------------------------------



function gameRequestHandler(req, res) {
  if(activeGames[req.user]===undefined) {
    addToQueue(req.user);
    matching(req.user)
    res.send("wait");
    return ;
  } else if(activeGames[req.user].turn = req.user) {
    //handle move logic
    res.send(activeGames[req.user])
  } else {
    res.send(activeGames[req.user])
  }

}

module.exports = gameRequestHandler;