class client_board{
  constructor(element_id){
    this.board = null;
    this.background = null;
    this.color_map = null;
    this.player_id = -1;
    this.CreateColorMap();
    
    this.app = new PIXI.Application({ background: '#1099bb', view: document.getElementById(element_id) });
    document.body.appendChild(this.app.view);
  }

  CreateColorMap(){
    this.color_map = [];
    for (let c = 0; c < 256; c++) {
      if (c % 25 == 0) {
        this.color_map.push(0);
      }
      else if (c < 50) {
        this.color_map.push(5*Math.floor(Math.cos(c)) + 50 + c * 3);
      }
      else if (c < 55) {
        this.color_map.push(16776960);
      }
      else if (c < 200) {
        this.color_map.push(256 + 256 * c);
      }
      else {
        this.color_map.push(15790080 + c);
      }
    }
  }

  ApplyColorMap(){
    let num_rows = this.board.length;
    let num_cols = this.board[0].length;
    for (let row = 0; row < num_rows; row++) {
      for (let col = 0; col < num_cols; col++) {
        this.background.beginFill(color_map[this.board[row][col]]);
        this.background.drawRect(col, row, 1, 1);
        this.background.endFill();
      }
    }
  }

  PlacePieces(pieces){
    for(let p = 0; p < pieces.length; p++){
      let piece = pieces[p];
      
      if((piece.id in this.sprites) == false){
        this.sprites[piece.id] = PIXI.Sprite.from((piece.id == this.player_id) ? 'my' + piece.type + '.png' : piece.type + '.png');
        this.sprites[piece.id].anchor.set(0.5);
        this.MoveSprite(piece);
        this.app.stage.addChild(this.sprites[piece.id]);
      }
      else{
        this.MoveSprite(piece);
      } 
    }
  }

  MoveSprite(piece){
    let scale = 1 - (.05 * (9 - Math.floor(piece.z / 10)));
    this.sprites[piece.id].x = piece.x;
    this.sprites[piece.id].y = piece.y;
    this.sprites[piece.id].rotation = Math.atan2(piece.Hy, piece.Hx);
    this.sprites[piece.id].scale.set(scale, scale);
  }

  Update(update){
    if(update instanceof Blob){
      const audioUrl = URL.createObjectURL(update);
      const audio = new Audio(audioUrl);
      audio.play();
    }
    else if("first_contact" in update){
      this.player_id = update.new_id;
      this.board = update.board;
      this.background = new PIXI.Graphics();
      this.ApplyColorMap();
      this.app.stage.addChild(this.background);

      if("pieces" in update){
        this.PlacePieces(update.pieces);
      }
    }
    else{
      if("board" in update){
        this.board = update.board;
        this.background.beginFill(0x0);
        this.background.drawRect(0, 0, this.board[0].length, this.board.length);
        this.background.endFill();
  
        this.ApplyColorMap();
        }
      }
  
      if("pieces" in update){
        this.PlacePieces(update.pieces);
      }
    }
  }
}
