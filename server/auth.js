var SignedIn = {

};

function authenticate(req, res, next) {
  var cookie = req.cookies.user;
  req.user = cookie.username;
  if (SignedIn[cookie.username] !== cookie.password) {
    res.status(400)
    res.send("Not Logged In")
  } else {
    next()
  }
}

function add(user) {
  SignedIn[user.username] = user.password
  console.log("added user to sessions", user.username)
}

// module.exports.list = SignedIn;
module.exports.auth = authenticate;
module.exports.add = add;
