class ui {
  static keycodes = null;
  
  constructor(){
      if(ui.keycodes == null){
        ui.keycodes = [];
        
        //numpad with numlock on and off
        ui.keycodes[36] = ui.keycodes[103] = "MOVE.NW";//7
        ui.keycodes[38] = ui.keycodes[104] = "MOVE.N"; //8 
        ui.keycodes[33] = ui.keycodes[105] = "MOVE.NE";//9
        ui.keycodes[39] = ui.keycodes[102] = "MOVE.E"; //6
        ui.keycodes[34] = ui.keycodes[99] = "MOVE.SE"; //3
        ui.keycodes[40] = ui.keycodes[98] = "MOVE.S";  //2
        ui.keycodes[35] = ui.keycodes[97] = "MOVE.SW"; //1
        ui.keycodes[37] = ui.keycodes[100] = "MOVE.W"; //4
  
        ui.keycodes[65] = "AIM.L"; //a
        ui.keycodes[68] = "AIM.R"; //d
        ui.keycodes[87] = "AIM.U"; //w
        ui.keycodes[88] = "AIM.D"; //x
        
        ui.keycodes[32] = "AIM.FIRE"; //spacebar
      }
  }

  OnKeyUpHandler(event){

  }
}
