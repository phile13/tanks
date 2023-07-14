class GameSpace {
    static board = [];
    static width = 512;
    static height = 512;
    static pieces = [];

    static GRASS = 50;
    static WALL = 99;

    static Create(width, height) {
        GameSpace.width = width;
        GameSpace.height = height;

        
        let wall = [];
        for (let x = 0; x < width; x++) {
            wall.push(GameSpace.WALL);
        }
        GameSpace.board.push(wall);

        width -= 2;
        height -= 2;
        for (let y = 1; y < height; y++) {
            let row = [GameSpace.WALL];
            for (let x = 0; x < width; x++) {
                row.push(GameSpace.GRASS);
            }
            row.push(GameSpace.WALL);
            GameSpace.board.push(row);
        }

        GameSpace.board.push(wall);
    }

    static BoardToString() {
        return "[[" + GameSpace.board.map(e => e.join(',')).join('],[') + "]]";
    }

    static MoveIsOkay(radius, x, y) {
        let start_y = Math.floor(y - radius);
        start_y = (start_y < 0) ? 0 : (start_y > GameSpace.height) ? GameSpace.height : start_y;
        let stop_y = Math.ceil(y + radius);
        stop_y = (stop_y < 0) ? 0 : (stop_y > GameSpace.height) ? GameSpace.height : stop_y;
        let start_x = Math.floor(x - radius);
        start_x = (start_x < 0) ? 0 : (start_x > GameSpace.width) ? GameSpace.width : start_x;
        let stop_x = Math.ceil(y + radius);
        stop_x = (stop_x < 0) ? 0 : (stop_x > GameSpace.width) ? GameSpace.width : stop_x;

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