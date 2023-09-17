class client_messenger extends event_handler{
  constructor(){
    this.events = {};
  }

  Init(){
    this.ws = new WebSocket("ws://74.208.107.245:32123");
    this.ws.addEventListener("open", this.OpenHandler);
    this.ws.addEventListener("message", this.MessageHandler);
  }

  OpenHandler(){
    this.Send(0, "NEW");
  }

  MessageHandler(event){
    let msg = JSON.parse(event.data);
    this.DispatchEvent(msg.action, msg.data);
  }

  Send(id, action){
    this.ws.send(`{"id":${id},"action":"${action}"}`);
  }

}
