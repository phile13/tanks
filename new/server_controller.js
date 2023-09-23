class server_controller{
  constructor(ui){
    this.ws = new WebSocket.Server({port: 32123});
    ws.addEventListener("open", this.Open);
    ws.addEventListener("message", this.Receive);
  }

  Open(){
    console.log("Listening");
  }

  Send(obj){
    this.ws.send(JSON.stringify(obj));
  }

  Receive(event){
    try{
      let msg = JSON.parse(event.data);
      if("id" in msg && "action" in msg){
        this.board.Update(msg.id, msg.action);
      }
    }
    catch(e){
    }
  }
}

