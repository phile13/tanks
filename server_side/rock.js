const Thing = require("./thing.js");

class Tree extends Thing {
    width = 0;
    height = 0;

    constructor(location, width, height) {
        super(location);
        this.width = width;
        this.height = height;
        this.can_destroy = true;
        this.can_damage = true;
    }

}

export module.Rock;