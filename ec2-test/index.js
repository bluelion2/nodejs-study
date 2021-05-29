const express = require("express");

const app = express();

app.set("port", 3001);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3001, () => console.log("Listening on", 3001));

module.exports = app;