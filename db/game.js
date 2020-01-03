var db = require('./db');
var bb = require('bluebird');


var GameSchema = db.Schema({
  player1: String,
  player2: String,
  turn: String,
  isOver: Boolean,
  board: [Array]
})

var Game = db.model("game", GameSchema);

Game.create = bb.promisify(Game.create);
Game.findById = bb.promisify(Game.findById);
Game.findOnebyIdAndUpdate = bb.promisify(Game.findOneByIdAndUpdate);


function newGame(player1, player2) {
  return Game.create({
    player1,
    player2,
    turn: player1,
    isOver: false,
    board: [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ]
  })
}

function findGame(id) {
  return Game.findById(id)
}

function updateGame(id, game) {
  Game.findOneByIdAndUpdate(id, game)
}

module.exports.new = newGame;
module.exports.find = findGame;
module.exports.update = updateGame;

