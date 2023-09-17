class player{  
  static keycodes = null;
  
  constructor(ws){
    if(player.keycodes == null){
      player.keycodes = [];
      
      //numpad with numlock on and off
      player.keycodes[36] = player.keycodes[103] = "ALPHA.NW";//7
      player.keycodes[38] = player.keycodes[104] = "ALPHA.N"; //8 
      player.keycodes[33] = player.keycodes[105] = "ALPHA.NE";//9
      player.keycodes[39] = player.keycodes[102] = "ALPHA.E"; //6
      player.keycodes[34] = player.keycodes[99] = "ALPHA.SE"; //3
      player.keycodes[40] = player.keycodes[98] = "ALPHA.S";  //2
      player.keycodes[35] = player.keycodes[97] = "ALPHA.SW"; //1
      player.keycodes[37] = player.keycodes[100] = "ALPHA.W"; //4

      player.keycodes[65] = "BETA.L"; //a
      player.keycodes[68] = "BETA.R"; //d
      player.keycodes[87] = "BETA.U"; //w
      player.keycodes[88] = "BETA.D"; //x
      
      player.keycodes[32] = "BETA.FIRE"; //spacebar
    }

    this.ws = ws;
    this.id = 0;
    ws.addEventListener("open", this.New);
    ws.addEventListener("message", this.Receive);
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
    this.ws.send(`{"id":${this.id},"action":"${action}"}`);
  }

  Receive(event){
    try{
      let msg = JSON.parse(event.data);
      if(rep.action == "NEW"){
        this.Add(rep);
      }
      else if(rep.action == "UPDATE"){
        this.Update(rep);
      }
      else if(rep.action == "BOARD"){
        this.Board(rep);
      }
    }
    catch(e){
    }
  }
  
  
}
