class server_messenger extends event_handler{
  constructor(){
    this.events = {};
  }

  Init(){
    const WebSocket = require('ws');
    this.ws = new WebSocket.Server({port: 32123});
    this.ws.addEventListener("open", this.OpenHandler);
    this.ws.addEventListener("connection", this.ConnectionHandler);
  }

  OpenHandler(){
    console.log("opened");
  }

  ConnectionHandler(event){
    let msg = JSON.parse(event.data);
    this.ActionRequested(msg.id, msg.action);
  }

  ActionRequested(id, action){
    
  }

  Send(action, data){
    this.ws.send(`{"action":"${action}","data":"${data}"}`);
  }

}
