const express = require("express");
const config = require("./config");
const mongoose = require("mongoose");
const User = require('./models/user.js');
const bodyParser = require('body-parser');
const routes = require('./routes');
const morgan = require('morgan');

const app = express();

mongoose.connect(config.uri);

db = mongoose.connection;
db.on("error", function(err) {
  console.log('mongoose connection failed!', err);
});
db.once("open", function() {
   const user = new User({
   username: '666',
   password: '666'
 });
  user.save();
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));


routes(app);

app.listen(config.port ,function() {
  console.log("express running on port: " + config.port);
});
