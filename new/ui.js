class ui {
  static keycodes = null;
  
  constructor(type, board_element_id){
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

      this.type = type;
      this.board = new client_board(this);
      this.cc = new client_controller(this); 

      document.addEventListener('keydown',OnKeyDownHandler);
  }

  OnKeyDownHandler(event){
    if("code" in event && event.code in ui.keycodes){
      this.cc.Send(ui.keycodes[event.code]);
    }
  }
}
