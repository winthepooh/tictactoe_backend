const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

global.__basedir = __dirname;

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const server = require("http").createServer(app);
const WebSocket = require("ws");
const { connectionInit } = require("./apps/sockethandler/sockethandler");
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  connectionInit(ws);
});

require("./apps/routes/user.route")(app);
require("./apps/routes/match.route")(app);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
