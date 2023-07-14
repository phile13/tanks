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
		Object.values(this.#tanks).forEach(tank => {
			tank.Socket.send(changed_tank_msg);
		});
    }

	constructor(socket) {
		this.#id = Tank.GetNextId();
		Tank.tanks[this.#id] = this;
		this.#x = 0;
		this.#y = 0;
		this.#Hx = 0;
		this.#Hy = 0;
		this.#Zx = 0;
		this.#Zy = 0;

		this.#socket = socket;
		this.#socket.on("message", this.HandleMessages);
		this.#socket.on("close", () => { delete Tank.tanks[this.#id] });
	}

	get Id() {
		return this.#id;
	}
	get x() {
		return this.#x;
	}
	get y() {
		return this.#y;
	}
	get Hx() {
		return this.#Hx;
	}
	get Hy() {
		return this.#Hy;
	}
	get Zx() {
		return this.#Zx;
	}
	get Zy() {
		return this.#Zy;
	}


	HandleMessages(msg) {
		let req = null;
		try {
			req = JSON.parse(msg);
		} catch (e) {
			req = msg;
		}

		if ("id" in req && "action" in req) {
			if (req.action == "new") {
				let x = 0;
				let y = 0;
				let Zx = 0;
				let Zy = 0;
				do {
					x = 1 + Math.random() * (GameSpace.length - 2);
					y = 1 + Math.random() * (GameSpace.depth - 2);
					Zx = this.#x / Tank.SIZE;
					Zy = this.#y / Tank.SIZE;
				} while (GameSpace.MoveIsOkay(Tank.RADIUS, x, y) && Tank.MoveIsOkay(this.#id, Zx, Zy));
				this.#x = x;
				this.#y = y;
				this.#Zx = Zx;
				this.#Zy = Zy;
				this.#socket.send('{"type":"new","id":' + this.#id + ',"board":' + GameSpace.BoardToString() + '}');
				Tank.UpdateOtherTanks(this.UpdateMessage());
			}
			else if (req.id in Tank.tanks) {
				let change_requested = true;
				let x = this.#x;
				let y = this.#y;
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
					default:
						change_requested = false;
						break;
				}

				if (change_requested) {
					let Zx = this.#x / Tank.SIZE;
					let Zy = this.#y / Tank.SIZE;
					if (GameSpace.MoveIsOkay(Tank.RADIUS, x, y) && Tank.MoveIsOkay(this.#id, Zx, Zy)) {
						this.#Hx = x - this.#x;
						this.#Hy = y - this.#y;
						this.#x = x;
						this.#y = y;
						this.#Zx = Zx;
						this.#Zy = Zy;
						Tank.UpdateOtherTanks(this.UpdateMessage());
					}
				}
			}
			else {
				client.send("action[" + req.action + "]: unknown");
			}
		}
		else {
			client.send("json not correct" + JSON.stringify(msg));
		}
	}

	MoveIsOkay(id, Zx, Zy) {
		Object.values(this.#tanks).forEach(tank => {
			if (id != tank.Id) {
				if (Math.abs(Zx - tank.Zx) < 1 || Math.abs(Zy - tank.Zy) < 1) {
					return false;
				}
			}
		});
		return true;
	}

	UpdateMessage() {
		return '{"id":' + this.#id + ',"x":' + this.#x + ',"y":' + this.#y + ',"Hx":' + this.#Hx + ',"Hy":' + this.#Hy + ',"type":"tank"}';
    }
}

module.exports = Tank;