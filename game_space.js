class GameSpace {
    static board = [];
    static length = 512;
    static depth = 512;
    static pieces = [];

    static GRASS = 50;
    static WALL = 99;

    static Create(length, depth) {
        GameSpace.length = length;
        GameSpace.depth = depth;

        depth -= 2;
        let wall = [];
        for (let x = 0; x < length; x++) {
            wall.push(GameSpace.WALL);
        }
        GameSpace.board[y].push(wall);

        for (let y = 1; y < depth-1; y++) {
            let row = [GameSpace.WALL];
            for (let x = 0; x < length; x++) {
                row.push(GameSpace.GRASS);
            }
            row.push(GameSpace.WALL);
            GameSpace.board[y].push(row);
        }

        GameSpace.board[y].push(wall);
    }

    static BoardToString() {
        return "[[" + GameSpace.board.map(e => e.join(',')).join('],[') + "]]";
    }

    static MoveIsOkay(radius, x, y) {
        let start_y = Math.floor(y - radius);
        start_y = (start_y < 0) ? 0 : (start_y > GameSpace.depth) ? GameSpace.depth : start_y;
        let stop_y = Math.ceil(y + radius);
        stop_y = (stop_y < 0) ? 0 : (stop_y > GameSpace.depth) ? GameSpace.depth : stop_y;
        let start_x = Math.floor(x - radius);
        start_x = (start_x < 0) ? 0 : (start_x > GameSpace.length) ? GameSpace.length : start_x;
        let stop_y = Math.ceil(y + radius);
        stop_x = (stop_x < 0) ? 0 : (stop_x > GameSpace.length) ? GameSpace.length : stop_x;

        for (let Y = start_y; Y < stop_y; Y++) {
            for (let X = start_x; X < stop_x; X++) {
                if (GameSpace.board[Y][X] == GameSpace.WALL) {
                    return false;
                }
            }
        }
        return true;
    }
}
module.exports = GameSpace;