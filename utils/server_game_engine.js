class server_game_engine extends server_messenger{
  constructor(){

  }
  
  ActionRequested(id, action){
    if(action in this){
      this[action](id);
    }
  }

  NEW(id){
    
  }

  FIRE(id){

  }
  
}
