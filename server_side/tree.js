const Thing = require("./thing.js");

class Tree extends Thing {
    canopy_width = 0;
    trunk_width = 0;
    height = 0;

    constructor(location, trunk_width, canopy_width, height) {
        super(location);
        this.trunk_width = trunk_width;
        this.canopy_width = canopy_width;
        this.height = height;
        this.can_destroy = true;
        this.can_damage = true;
    }
}

export module.Tree;