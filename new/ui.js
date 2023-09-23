class ui {
  static keycodes = null;
  
  constructor(board_element_id){
      if(ui.keycodes == null){
        ui.keycodes = {};
      
        ui.keycodes["Numpad7"] = "MOVE.NW";
        ui.keycodes["Numpad8"] = ui.keycodes["ArrowUp"] = "MOVE.N"; 
        ui.keycodes["Numpad9"] = "MOVE.NE";
        ui.keycodes["Numpad6"] = ui.keycodes["ArrowRight"] = "MOVE.E";
        ui.keycodes["Numpad3"] = "MOVE.SE"; 
        ui.keycodes["Numpad2"] = ui.keycodes["ArrowDown"] = "MOVE.S";  
        ui.keycodes["Numpad1"] = "MOVE.SW"; 
        ui.keycodes["Numpad4"] = ui.keycodes["ArrowLeft"] = "MOVE.W";
  
        ui.keycodes["KeyA"] = "AIM.L";
        ui.keycodes["KeyD"] = "AIM.R";
        ui.keycodes["KeyW"] = "AIM.U";
        ui.keycodes["KeyX"] = "AIM.D";
        
        ui.keycodes["Space"] = "AIM.FIRE";
      }

      client_controller.Register(this); 
  }

  SetId(id){
    this.id = id;
  }
  GetId(){
    return this.id;
  }
  
  OnKeyUpHandler(event){
    if("code" in event && event.code in ui.keycodes){
      client_controller.Send(this.GetId(), ui.keycodes[event.code]);
    }
  }

  OnServerUpdate(event){
    if("board" in event){
      this.UpdateBoard(event.board);  
    }

    if("pieces" in event){
      this.UpdatePieces(event.pieces);
    }
  }

  UpdateBoard(updates){

  }

  UpdatePieces(pieces){
    
  }
  
}
