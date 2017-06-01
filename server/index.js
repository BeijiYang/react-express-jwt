const express = require("express");
const config = require("./config");
const app = express();

app.get("/api", function(req, res) {
  res.send("viva la vida !")
})

app.listen(config.port ,function() {
  console.log("running on port: " + config.port);
});
