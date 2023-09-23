class client_controller{  
  constructor(ui){
    this.ui = ui;
    this.id = -1;
    this.ws = new WebSocket("ws://74.208.107.245:32123");
    ws.addEventListener("open", this.Open);
    ws.addEventListener("message", this.Receive);
  }

  Open(){
    this.Send("NEW" + this.ui.type);
  }

  Send(action){
    this.ws.send(`{"id":${this.id},"action":"${action}"}`);
  }

  Receive(event){
    try{
      let msg = JSON.parse(event.data);
      if("type" in msg and msg.type == "_GAME_UPDATE_"){
        ui.OnServerUpdate(msg);
      }
    }
    catch(e){
    }
  }
}
