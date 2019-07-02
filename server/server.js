const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
var server = require("http").createServer(app);
const port = process.env.PORT || 8000;
app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.send(path.join(publicPath, "index.html"));
});

server.listen(port, () => {
  console.log(publicPath);
  console.log("Server is up!");
});