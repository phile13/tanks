class client_messenger{
  constructor(){
    this.events = {};
  }
  
  AddEventListener(type,func){
    if(type in events == false){
      this.events[type] = [];
    }
    this.events[type].push(func);
  }

  DispatchEvent(type,data){
    if(type in this.events){
      let evts = this.events[type];
      for(let e = 0; e < evts.length; e++){
        try{
          evts[e](data);
        }
        catch(err){

        }
      }
    }
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
