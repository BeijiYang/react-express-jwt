const User = require('./models/user');
const jwt = require('jsonwebtoken');
const config = require('./config');

const generateToken = function(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 3000
  })
}

module.exports = function(app) {

  app.get("/api", function(req, res) {
    res.send("viva la vida !")
  });

  app.post('/auth/login', function(req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
      if(err) {return console.log(err);}
      if(!user) {return res.status(403).json({error: "the user does not exist"});}
      user.comparePassword(req.body.password, function(err, isMatch) {
        if(err) {return console.log(err);}
        if(!isMatch) {return res.status(403).json({error: "wrong password"});}
        return res.json({
          token: generateToken({name: user.username}),
          user: {name: user.username}
        })
      })
    })
  })
}
