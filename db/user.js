var db = require('./db');
var bb = require('bluebird');

var ObjectId = db.Schema.Types.ObjectId;


var UserSchema = db.Schema({
  username: String,
  password: String,
  currentGame: ObjectId,
  previousGames: [ObjectId]
})

var User = db.model("user", UserSchema);

User.findOne = bb.promisify(User.findOne);
User.create = bb.promisify(User.create);
User.findOneAndUpdate = bb.promisify(User.findOneAndUpdate);

function findUser(id) {
  return User.findOne({username: id})
}

function createUser(username, password) {
  return User.create({
    username,
    password
  })
}

function changeBoard(user, boardId) {
  return User.findOneAndUpdate({username: user}, {currentGame: boardId})
}

module.exports.find = findUser;
module.exports.create = createUser;
module.exports.changeBoard = changeBoard;