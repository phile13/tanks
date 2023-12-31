const Tank = require("./tank.js");
const GameSpace = require("./game_space.js");
GameSpace.Create(800, 600);

const WebSocket = require('ws');
let server = new WebSocket.Server({port: 32123});
server.on("open", () => {
	console.log("opened");
});

server.on("connection", (client) => {
	console.log("connection");
	new Tank(client);
});

