class event_handler{
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
}
