var User = require("../db/user.js")

function signUp(req, res) {
  console.log(req.body, typeof req.body.username)
  User.find(req.body.username)
  .then(data=>{
    if(!data) {
      return User.create(req.body.username, req.body.password)
    } else {
      res.status(400)
      res.send()
    }
  })
  .then(()=>{
    res.status(200)
    res.send()
  })

}

module.exports = signUp;