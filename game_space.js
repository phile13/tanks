class GameSpace {
    static board = [];
    static width = 800;
    static height = 600;
    static pieces = [];

    static GRASS = 50;
    static WALL = 99;

    static PeakHeight(A, x0, y0, sx2, sy2, x, y) {
        return (A * Math.exp(-((Math.pow(x - x0, 2) / (sx2)) + (Math.pow(y - y0, 2) / (sy2)))));
    }
    static CalcElevation(P1, P2, P3, x, y) {
        return Math.floor((GameSpace.PeakHeight(P1.A, P1.x0, P1.y0, P1.sx2, P1.sy2, x, y)
            + GameSpace.PeakHeight(P2.A, P2.x0, P2.y0, P2.sx2, P2.sy2, x, y)
            + GameSpace.PeakHeight(P3.A, P3.x0, P3.y0, P3.sx2, P3.sy2, x, y)) / 3);
    }
    static CreatePeaks() {
        return [4 + Math.random() * 6,
            Math.random() * GameSpace.width,
            Math.random() * GameSpace.height,
            2 * Math.pow(Math.random() * GameSpace.width * .5),
            2 * Math.pow(Math.random() * GameSpace.height * .5)
        ];
    }
    static AddWalls() {
        let x1 = GameSpace.width - 1;
        let x2 = GameSpace.width - 2;
        for (let y = 0; y < GameSpace.height; y++) {
            GameSpace.board[y][0] = 99;
            GameSpace.board[y][1] = 99;
            GameSpace.board[y][x2] = 99;
            GameSpace.board[y][x1] = 99;
        }


        let y1 = GameSpace.height - 1;
        let y2 = GameSpace.height - 2;
        for (let x = 0; x < GameSpace.width; x++) {
            GameSpace.board[0][x] = 99;
            GameSpace.board[1][x] = 99;
            GameSpace.board[y2][x] = 99;
            GameSpace.board[y1][x] = 99;
        }
    }

    static Create(width, height) {
        GameSpace.width = width;
        GameSpace.height = height;

        GameSpace.board = new Array(height).fill().map(() => new Array(width).fill(0));
        let [P1, P2, P3] = GameSpace.CreatePeaks();

        for (let y = 0; y < GameSpace.height; y++) {
            for (let x = 0; x < GameSpace.width; x++) {
                GameSpace.board[y][x] = GameSpace.CalcElevation(P1, P2, P3, x, y);
            }
        }

        GameSpace.AddWalls();
    }


    static CreateOld(width, height) {
        GameSpace.width = width;
        GameSpace.height = height;
 
        GameSpace.board = new Array(height).fill().map(() => new Array(width).fill(0));

        let num_x_tiles = width / 40;
        let num_y_tiles = height / 40;
        let tile_values = new Array(num_y_tiles).fill().map(() => new Array(num_x_tiles).fill(0));


        let elevation_change_map = [-2, -1, -1, 0, 0, 0, 0, 1, 1, 2];
        let elevation = Math.floor(10 * Math.random());
        let biome = Math.floor(10 * Math.random());
       

        for (let y_tile = 0; y_tile < num_y_tiles; y_tile++) {

            let start_y = y_tile * 40;
            let stop_y = (y_tile + 1) * 40;
            for (let x_tile = 0; x_tile < num_x_tiles; x_tile++) {
                let new_elevation = elevation + elevation_change_map[Math.floor(10 * Math.random())];
                elevation = (new_elevation >= 0 && new_elevation < 10) ? new_elevation : elevation;

                if (y_tile % 10 == 0 && x_tile % 10 == 0) {
                    biome = 1 + Math.floor(2 * Math.random());
                }

                let value = elevation * 10 + ((elevation < 4) ? 0 : biome);
                


                let start_x = x_tile * 40;
                let stop_x = (x_tile + 1) * 40;
                for (let y = start_y; y < stop_y; y++) {
                    for (let x = start_x; x < stop_x; x++) {
                        GameSpace.board[y][x] = value;
                    }
                }
            }
        }
   
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