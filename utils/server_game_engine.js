class server_game_engine extends server_messenger{
  constructor(){

  }
  
  ActionRequested(id, action){
    if(action in this){
      this[action](id);
    }
    else{
      let [part,movement] = action.split(".");
      if(part in this){
        this[part](id, movement);
      }
    }
  }

  NEW(id){
    
  }
  
  ALPHA(id, movement){
    if(id in this.pieces){
      let x = this.pieces[id].alpha.x;
  		let y = this.pieces[id].alpha.y;
      switch(movement){
        case "N":
          y--;
          break;
        case "NW":
          x--;
          y--;
          break;
        case "W":
          x--;
          break;
        case "SW":
          x--;
          y++;
          break;
        case "S":
          y++;
          break;
        case "SE":
          x++;
          y++;
          break;
        case "E":
          x++;
          break;
        case "NE":
          x++;
          y--;
          break;
        default:
          return;
      }
      this.pieces[id].alpha.MoveTo(x,y);
    }
  }

  BETA(id, movement){
    if(id in this.pieces){
      let x = this.pieces[id].beta.x;
  		let y = this.pieces[id].beta.y;
      switch(movement){
  		  case "L":
          this.x += .05;
          break;
        case "R":
          this.x -= .05;
          break;
        case "U":
          this.y += .05;
          break;
        case "D":
          this.y += .05;
          break;
        default:
          return;
      }
      this.pieces[id].beta.MoveTo(x,y);
    }
  }

  UpdateMessage(id,action){
    return `{"id":${id},"action":"${action}","data":${this.alphas[id].ToDataString()}}`;
  }
  
}
