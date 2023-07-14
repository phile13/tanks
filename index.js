const GameSpace = require("./game_space.js");
GameSpace.Create(512, 512);

const WebSocket = require('ws');
const server = new WebSocket.Server({port: 32123});
server.on("open", () => {
	console.log("opened");
});

let client_id = 1;
let clients = {};
server.on("connection", (client) => {
	console.log("connection");
	let player = new Player(client);

	client.on("message", (msg) => {
		let req = null;
		try{
			req = JSON.parse(msg);
		} catch(e){
			req = msg;
		}

		if("id" in req && "action" in req){
			if(req.action == "new"){
				clients[client_id] = new Player(client_id);
				client.send('{"type":"new","id":'+ client_id + '}');
				client_id++;
			}
			else if(req.id in clients){
				if(req.action == "MOVE"){
					clients[req.id].x++;
					client.send(clients[client_id]);
				}
				else if(req.action == "STATE"){

				}
			}
			else{
				client.send("action[" + req.action + "]: unknown");
			}
		}
		else{
			client.send("json not correct" + JSON.stringify(msg));
		}
	});
});

