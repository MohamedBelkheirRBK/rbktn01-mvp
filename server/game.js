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

function handleTurn(player, board) {
  var game = activeGames[player];
  if (game.turn !== player){
    return ;
  }
  game.board = board;
  if (game.turn == game.player1)
    game.turn = game.player2
  else
    game.turn = game.player1

  if (game.isOver){
    delete activeGames[game.player1]
    delete activeGames[game.player2]
  }
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
  } else {
    handleTurn(req.user, req.body.board)
    res.send(activeGames[req.user])
  }

}

module.exports = gameRequestHandler;