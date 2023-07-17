class GameSpace {
    static board = [];
    static width = 800;
    static height = 600;
    static pieces = [];

    static WATERLINE = 50;
    static WALL = 99;

    static PeakHeight(A, x0, y0, sx2, sy2, x, y) {
        return (A * Math.exp(-((Math.pow(x - x0, 2) / (sx2)) + (Math.pow(y - y0, 2) / (sy2)))));
    }
    static CalcElevation(P1, P2, P3, x, y) {
        let a = GameSpace.PeakHeight(P1.A, P1.x0, P1.y0, P1.sx2, P1.sy2, x, y);
        let b = GameSpace.PeakHeight(P2.A, P2.x0, P2.y0, P2.sx2, P2.sy2, x, y);
        let c = GameSpace.PeakHeight(P3.A, P3.x0, P3.y0, P3.sx2, P3.sy2, x, y);
        return Math.floor(1 + ((Math.max(a, b, c) + a + b + c - Math.min(a, b, c))/3));
    }
    static CreatePeak(x) {
        return {
            A: 50 + Math.random() * 155,
            x0: Math.random() * GameSpace.width, 
            y0: Math.random() * GameSpace.height,
            sx2: 10000 + Math.random() * 10000 * x,
            sy2: 10000 + Math.random() * 10000 * x
        };
    }
    static AddWalls() {
        let x1 = GameSpace.width - 1;
        let x2 = GameSpace.width - 2;
        for (let y = 0; y < GameSpace.height; y++) {
            GameSpace.board[y][0] = GameSpace.WALL;
            GameSpace.board[y][1] = GameSpace.WALL;
            GameSpace.board[y][x2] = GameSpace.WALL;
            GameSpace.board[y][x1] = GameSpace.WALL;
        }


        let y1 = GameSpace.height - 1;
        let y2 = GameSpace.height - 2;
        for (let x = 0; x < GameSpace.width; x++) {
            GameSpace.board[0][x] = GameSpace.WALL;
            GameSpace.board[1][x] = GameSpace.WALL;
            GameSpace.board[y2][x] = GameSpace.WALL;
            GameSpace.board[y1][x] = GameSpace.WALL;
        }
    }

    static Create(width, height) {
        GameSpace.width = width;
        GameSpace.height = height;
        GameSpace.board = new Array(height).fill().map(() => new Array(width).fill(0));
        let P1 = GameSpace.CreatePeak(16);
        let P2 = GameSpace.CreatePeak(10);
        let P3 = GameSpace.CreatePeak(6);
        console.log(P1);
        console.log(P2);
        console.log(P3);
        let biome = 1 + Math.floor(2 * Math.random());
        for (let y = 0; y < GameSpace.height; y++) {
            for (let x = 0; x < GameSpace.width; x++) {
                let elevation = GameSpace.CalcElevation(P1, P2, P3, x, y);
                GameSpace.board[y][x] = GameSpace.CalcElevation(P1, P2, P3, x, y);
            }
        }
        GameSpace.AddWalls();
    }

    static BoardToString() {
        return "[[" + GameSpace.board.map(e => e.join(',')).join('],[') + "]]";
    }

    static MoveIsOkay(radius, x, y) {
        try {
            radius *= .05 * (9 - Math.floor(GameSpace.board[y][x] / 10));
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
                    if (GameSpace.board[Y][X] == GameSpace.WALL || GameSpace.board[Y][X] < GameSpace.WATERLINE) {
                        return false;
                    }
                }
            }
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
module.exports = GameSpace;