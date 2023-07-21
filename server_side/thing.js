const GameSpace = require("../game_space");


class Thing {

	static next_id = 0;
	static GetNextId() {
		return Thing.next_id++;
	}
	static all_objects = {};
	static notifiables = {};

	object_type = "nmo";
	id = 0;
	location = null;
	max_health = 100;
	active_item = null;

	can_destroy = false;
	can_damage = false;
	can_heal = false;
	can_notify = false;
	can_store = false;
	can_be_stored = false;
	can_move = false;
	can_move_thru = false;

	constructor(location) {
		this.location = location;
		Create();
	}

	Notify(state, id, extra_msg = "null") {
		if (Object.keys(Thing.notifiables).length > 0) {
			let msg = null;
			switch (state) {
				case "new":
					msg = '{"msg_type":"new","object_type":"' + this.object_type + '","id":' + id + ',"info":' + extra_msg + '}';
					break;
				case "update":
					msg = '{"msg_type":"update","object_type":"' + this.object_type + '","id":' + id + ',"info":' + extra_msg + '}';
					break;
				case "delete":
					msg = '{"msg_type":"delete","id":' + id + '}';
					break;
				default:
					break;
			}

			if (msg !== null) {
				Object.values(Thing.notifiables).forEach(n => {
					n.Notify();
				});
            }
		}
    }

	Create() {
		this.id = Thing.GetNextId();
		Thing.all_objects[this.id] = this;
		if (this.can_notify) {
			Thing.notifiables[this.id] = this;
		}
		Notify("new", this.id, '{"board":' + GameSpace.BoardToString() + ',"pieces":' + NonMovableObject.PiecesToString() + '}');
	}

	Update(extra_msg) {
		Notify("update", this.id, extra_msg);
	}

	Destroy() {
		if (this.can_destroy) {
			delete Thing.all_objects[this.id];
			if (this.can_notify) {
				delete Thing.notifiables[this.id];
			}
			Notify("delete", this.id);
        }
	}



	Damage(hit_strength) {
		if (this.can_damage) {
			this.health -= hit_strength;
			if (this.health < 0) {
				this.Destroy();
			}
			else {
				this.Update('{"health":' + this.health + '}');
            }
        }
	}

	Heal(health_strength) {
		if (this.can_heal) {
			this.health += health_strength;
			if (this.health > this.max_health) {
				this.health = this.max_health;
			}
			this.Update('{"health":' + this.health + '}');
        }
	}



	AddToStorage(id) {
		if (this.can_store) {
			if (id in this.all_objects && this.all_objects[id].can_be_stored) {
				this.storage.push(id);
				this.Update('{"add_to_storage":' + id + '}');
            }
        }
	}

	RemoveFromStorage(id) {
		if (this.can_store) {
			if (id in this.storage) {
				delete this.storage[id];
				this.Update('{"remove_from_storage":' + id + '}');
			}
        }
	}



	ActivateItem(obj) {
		if (obj != null) {
			this.active_item = obj;
			this.Update('{"activate_item":' + this.active_item.id + '}');
        }
	}

	UseActiveItem() {
		if (this.active_item != null) {
			this.active_item.Use();
			this.Update('{"use_active_item":' + this.active_item.id + '}');
        }
	}

	MoveActiveItem() {
		this.Update('{"active_item_location":' + this.active_item.location.ToString() + '}');
    }

	DeactivateItem(obj) {
		if (this.active_item) {
			this.Update('{"deactivate_item":' + this.active_item.id + '}');
			this.active_item = null;
		}
	}


	Move(x, y, z) {
		if (this.can_move) {
			if (this.location.set(x, y, z)) {
				this.Update('{"move_to":' + this.location.ToString() + '}');
            }
        }
    }

	Use() {
		//need to implement
	}
}

export module.NonMovableObject;