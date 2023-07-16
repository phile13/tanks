const GameSpace = require("./game_space.js");

class Tank {
	static next_id = 0;
	static GetNextId() {
		return Tank.next_id++;
	}
	static tanks = {};
	static SIZE = 20;
	static RADIUS = 10;

	static UpdateOtherTanks(changed_tank_msg) {
		Object.values(Tank.tanks).forEach(tank => {
			tank.client.send(changed_tank_msg);
		});
	}

	id = -1;
	x = 0;
	y = 0;
	Hx = 0;
	Hy = 0;
	Zx = 0;
	Zy = 0;
	client = null;


	constructor(client) {
		this.id = Tank.GetNextId();
		Tank.tanks[this.id] = this;
		this.x = 0;
		this.y = 0;
		this.Hx = 0;
		this.Hy = 0;
		this.Zx = 0;
		this.Zy = 0;

		this.client = client;
		this.client.on("message", (msg) => {
			this.HandleMessages(msg);
		});
		this.client.on("close", () => {
			delete Tank.tanks[this.id];
		});
	}


	HandleMessages(msg) {
		//console.log("msg:" + msg);
		let req = null;
		try {
			req = JSON.parse(msg);
		} catch (e) {
			req = msg;
		}

		if ("id" in req && "action" in req) {
			if (req.action == "NEW") {
				let x = 0;
				let y = 0;
				let Zx = 0;
				let Zy = 0;
				do {
					x = Tank.RADIUS + 1 + Math.floor(Math.random() * (GameSpace.width - Tank.SIZE - 2));
					y = Tank.RADIUS + 1 + Math.floor(Math.random() * (GameSpace.height - Tank.SIZE - 2));
					Zx = x / Tank.SIZE;
					Zy = y / Tank.SIZE;
				} while (GameSpace.MoveIsOkay(Tank.RADIUS, x, y) == false || Tank.MoveIsOkay(this.id, Zx, Zy) == false);
				this.x = x;
				this.y = y;
				this.Zx = Zx;
				this.Zy = Zy;

				let rep_msg = '{"type":"new","id":' + this.id + ',"board":' + GameSpace.BoardToString() + ',"width":' + GameSpace.width + ',"height":' + GameSpace.height +'}';
				//console.log(rep_msg);
				this.client.send(rep_msg);
				Tank.UpdateOtherTanks(this.UpdateMessage());
			}
			else if (req.action == "FIRE") {

            }
			else if (req.id in Tank.tanks) {
				let change_requested = true;
				let x = this.x;
				let y = this.y;
				switch (req.action) {
					case "N":
						y--;
						break;
					case "NW":
						x--;
						y--;
						break;
					case "W":
						x--;
						break;
					case "SW":
						x--;
						y++;
						break;
					case "S":
						y++;
						break;
					case "SE":
						x++;
						y++;
						break;
					case "E":
						x++;
						break;
					case "NE":
						x++;
						y--;
						break;
					case "C":
						break;
					default:
						change_requested = false;
						break;
				}

				if (change_requested) {
					let Zx = x / Tank.SIZE;
					let Zy = y / Tank.SIZE;
					 
					if (GameSpace.MoveIsOkay(Tank.RADIUS, x, y) && Tank.MoveIsOkay(this.id, Zx, Zy)) {
						this.Hx = x - this.x;
						this.Hy = y - this.y;
						this.x = x;
						this.y = y;
						this.Zx = Zx;
						this.Zy = Zy;
						Tank.UpdateOtherTanks(this.UpdateMessage());
					}
				}
			}
			else {
				this.client.send("action[" + req.action + "]: unknown");
			}
		}
		else {
			this.client.send("json not correct" + JSON.stringify(msg));
		}
	}

	static MoveIsOkay(id, Zx, Zy) {
		let status = true;
		Object.values(Tank.tanks).forEach(tank => {
			if (id != tank.id) {
				if (Math.abs(Zx - tank.Zx) < 1 && Math.abs(Zy - tank.Zy) < 1) {
					status = false;
					return status;
				}
			}
		});
		return status;
	}

	UpdateMessage() {
		return '{"id":' + this.id + ',"x":' + this.x + ',"y":' + this.y + ',"Hx":' + this.Hx + ',"Hy":' + this.Hy + ',"type":"tank"}';
    }
}

module.exports = Tank;