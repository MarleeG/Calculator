const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const log = console.log;

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  log(`🌎 ==> API server now on port ${PORT}!`);
});
