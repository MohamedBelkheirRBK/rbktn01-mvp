// var Game = require('../db/game.js');
// var User = require('../db/user.js');

var activeGames = {};
var queueOfPlayers = {};


var Response = require('./response');


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
  return newGame;
}

function handleTurn(player, board) {
  var game = activeGames[player];
  console.log(player, game.turn)
  if (game.turn !== player){
    return false;
  }
  game.board = board;
  if (game.turn == game.player1)
    game.turn = game.player2
  else
    game.turn = game.player1

  if (checkForWin(game.board)){
    delete activeGames[game.player1]
    delete activeGames[game.player2]
  }
  return true;
}

function checkForWin(board) {
  function checker(row, col) {
    counter = {
      colC: 0,
      rowC: 0,
      minC: 0,
      majC: 0
    };
    for(var i = 0; i<board.length; i++) {
      if(board[i][col]){
        counter.colC++;
      }
      if(board[row][i]){
        counter.rowC++;
      }
      if(board[i][i]){
        counter.majC++;
      }
      if(board[i][board.length-i-1]){
        counter.minC++;
      }
    }
    for(var i in counter){
      if(counter[i]>2)
        return true
    }
  }

  for(var i=0; i<board.length; i++){
    if(checker(i,i))
      return true
  }
  return false;
}


function matching(user) {
  var opponent = "";
  for(var player in queueOfPlayers) {
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
  queueOfPlayers[user] = true;
}


//-------------------------------

function gameRequestHandler(req, res) {
  var user = req.user
  var respo = new Response("wait", null);

  if(req.body.type === "ping") {
    if(activeGames[user]===undefined) {
      addToQueue(user);
      var newGame = matching(user);
      if (newGame) {
        respo.status = "go"
        respo.game = newGame;
      }
    } else {
      if (activeGames[user].turn == user) {
        respo.status = "go";
        respo.game = activeGames[user];
      } else {
        respo.status = "ongoing";
      }
    }

    res.send(respo)

  } else if(req.body.type === "play") {
    if(activeGames[user]===undefined){
      res.status(400);
      res.send()
      return ;
    }

    if(handleTurn(user, req.body.board)){
      respo.status = "played"
    } else {
      respo.status = "not your turn"
    }
    respo.game = activeGames[user];
    res.send(respo)
  }
}



module.exports = gameRequestHandler;