var db = require('./db');
var bb = require('bluebird');

var UserSchema = db.Schema({
  username: String,
  password: String
})

var User = db.model("user", UserSchema);

User.findOne = bb.promisify(User.findOne);
User.create = bb.promisify(User.create);

function findUser(id) {
  return User.findOne({username: id})
}

function createUser(username, password) {
  return User.create({
    username,
    password
  })
}

module.exports.find = findUser;
module.exports.create = createUser;