class client_board{
  constructor(element_id){
    this.board = null;
    this.background = null;
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
    for (let row = 0; row < this.num_rows; row++) {
      for (let col = 0; col < this.num_cols; col++) {
        background.beginFill(color_map[this.board[row][col]]);
        background.drawRect(col, row, 1, 1);
        background.endFill();
      }
    }
  }

  Update(update){
    if("board" in update){
      this.board = update.board;
      
      if("first_contact" in update){
        this.background = new PIXI.Graphics();
        this.ApplyColorMap();
        this.app.stage.addChild(this.background);
      }
      else{
        this.background.beginFill(0x0);
        this.background.drawRect(0, 0, this.board[0].length, this.board.length);
        this.background.endFill();
  
        this.ApplyColorMap();
      }
    }

    if("pieces" in update){
      for(let p = 0; p < update.pieces.length; p++){
        let piece = update.pieces[p];
        
      }
    }
  }
}
