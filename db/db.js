var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/tictactoe")

module.exports = mongoose;

