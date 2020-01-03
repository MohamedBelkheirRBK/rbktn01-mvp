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
  if (game.turn !== player){
    return false;
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
  return true;
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
  var user = req.user
  var respo = new Response("wait", null);

  if(req.body.type === "ping") {
    console.log("got ping request")
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
    console.log("got move request")
    handleTurn(user, req.body.board)
    respo.status = "played"
    respo.game = activeGames[user];
    res.send(respo)
  }
}

// function gameRequestHandler(req, res) {
//   var response = new Response();
//   if(activeGames[req.user]===undefined) {
//     addToQueue(req.user);
//     response.status = "wait";
//     var game = matching(req.user);
//     if(game) {
//       response.status = "go";
//       response.game = game;
//     }
//     res.send(response);
//     return ;
//   } else {
//     response.status = "ongoing"
//     response.game = activeGames[req.user]
//     if(handleTurn(req.user, req.body.board))
//       response.status = "go"
//     res.send(response)
//   }

// }

module.exports = gameRequestHandler;