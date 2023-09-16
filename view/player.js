class player{  
  static keycodes = null;

  
  constructor(ws){
    this.ws = ws;
    if(player.keycodes == null){
      player.keycodes = [];
      
      //numpad with numlock on and off
      player.keycodes[36] = player.keycodes[103] = "NW";//7
      player.keycodes[38] = player.keycodes[104] = "N"; //8 
      player.keycodes[33] = player.keycodes[105] = "NE";//9
      player.keycodes[39] = player.keycodes[102] = "E"; //6
      player.keycodes[34] = player.keycodes[99] = "SE"; //3
      player.keycodes[40] = player.keycodes[98] = "S";  //2
      player.keycodes[35] = player.keycodes[97] = "SW"; //1
      player.keycodes[37] = player.keycodes[100] = "W"; //4

      player.keycodes[65] = "L"; //a
      player.keycodes[68] = "R"; //d
      player.keycodes[87] = "U"; //w
      player.keycodes[88] = "D"; //x
      
      player.keycodes[32] = "FIRE"; //spacebar
    }

    
    ws.addEventListener("open", () => {
        ws.send('{"id":0,"action":"NEW"}');
    });
  }

  New(){
    this.Send("NEW");
  }

  Move(keycode){
    if(keycode in player.keycodes){
      this.Send(player.keycodes[keycode]);
    }
  }
  
  Send(action){

  }

  
  
}
