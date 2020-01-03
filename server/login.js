var User = require("../db/user.js");
var { add } = require("./auth.js");

function login(req, res) {

  User.find(req.body.username)
  .then(data=>{
    if (!data ||req.body.password !== data.password){
      res.status(400);
      res.send()
    } else {
      res.status(200);
      res.cookie('user', req.body)
      add(req.body)
      res.send()
    }
  })


}

module.exports = login;