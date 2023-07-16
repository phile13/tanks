class GameSpace {
    static board = [];
    static width = 800;
    static height = 600;
    static pieces = [];

    static GRASS = 50;
    static WALL = 99;

    static Create(width, height) {
        GameSpace.width = width;
        GameSpace.height = height;
        console.log("make empty board");
        GameSpace.board = new Array(height).fill().map(() => new Array(width).fill(0));

        console.log("made empty board");
        let num_x_tiles = width / 40;
        let num_y_tiles = height / 40;

        let elevation_change_map = [-2, -1, -1, 0, 0, 0, 0, -1, -1, -2];
        let elevation = Math.floor(10 * Math.random);
        let biome = Math.floor(10 * Math.random());

        for (let y_tile = 0; y_tile < num_y_tiles; y_tile++) {

            let start_y = y_tile * 40;
            let stop_y = (y_tile + 1) * 40;
            for (let x_tile = 0; x_tile < num_x_tiles; x_tile++) {
                let new_elevation = elevation + elevation_change_map[Math.floor(10 * Math.random)];
                elevation = (new_elevation >= 0 || new_elevation < 10) ? new_elevation : elevation;
                if (y_tile % 10 == 0 && x_tile % 10 == 0) {
                    biome = 1 + Math.floor(2 * Math.random());
                }
                
                let value = elevation * 10 + ((elevation < 4) ? 0 : biome);
                console.log(y_tile + "," + x_tile + ":" + elevation + ":" + biome + ":" + value);
                let start_x = x_tile * 40;
                let stop_x = (x_tile + 1) * 40;
                for (let y = start_y; y < stop_y; y++) {
                    for (let x = start_x; x < stop_x; x++) {
                        GameSpace.board[y][x] = value;
                    }
                }
            }
        }
        console.log("filled board");

        let x1 = width - 1;
        let x2 = width - 2;
        for (let y = 0; y < height; y++) {
            GameSpace.board[y][0] = 99;
            GameSpace.board[y][1] = 99;
            GameSpace.board[y][x2] = 99;
            GameSpace.board[y][x1] = 99;
        }


        let y1 = height - 1;
        let y2 = height - 2;
        for (let x = 0; x < width; x++) {
            GameSpace.board[0][x] = 99;
            GameSpace.board[1][x] = 99;
            GameSpace.board[y2][x] = 99;
            GameSpace.board[y1][x] = 99;
        }
        console.log("walled board");
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
        let stop_x = Math.ceil(x + radius);
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