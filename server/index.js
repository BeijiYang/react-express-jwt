const express = require("express");
const config = require("./config");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(config.uri);

db = mongoose.connection;
db.on("error", function(err) {
  console.log('mongoose connection failed!', err);
});
db.once("open", function() {
  console.log("mongoose success!URI: "+config.uri);
})

app.get("/api", function(req, res) {
  res.send("viva la vida !")
})

app.listen(config.port ,function() {
  console.log("express running on port: " + config.port);
});
