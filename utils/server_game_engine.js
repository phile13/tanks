class server_game_engine extends server_messenger{
  constructor(){

  }
  
  ActionRequested(id, action){
    if(action in this){
      this[action](id);
    }
    else{
      let [part,movement] = action.split(".");
      if(part in this){
        this[part](id, movement);
      }
    }
  }

  NEW(id){
    
  }
  
  ALPHA(id, movement){

  }

  BETA(id, movement){

  }
  
}
