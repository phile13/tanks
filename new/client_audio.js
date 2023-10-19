class client_audio {
  constructor(id, socket){
    this.id = id;
    this.socket = socket;
    this.mime_type = null;
    this.mediaRecorder = null;
    this.stream_being_captured = null;
    
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      this.ready = false;
    }
    else{
      this.ready = true;
    }
  }
  
  start(){
    if(this.ready){
      this.reset();
      navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            this.stream_being_captured = stream;
            this.media_recorder = new MediaRecorder(this.stream_being_captured);
            this.media_recorder.addEventListener("dataavailable", this.data_handler);
            this.mime_type = this.media_recorder.mimeType;
            
            this.media_recorder.start(50);
          })
          .catch(error => {
            console.log(error.message);
          });
      }
  }

  data_handler(evt){
    let reader = new FileReader();
    reader.readAsDataURL(new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' }));
    reader.onloadend = () => {
      this.socket.send(`{"id":"${this.id}","type","audio","data":"${reader,result.split(";base64")[1]}"}`);
    }
  }
  
  

 stop(){
   if(this.ready){
      if(this.media_recorder){
        this.media_recorder.stop();
      }
      if(this.stream_being_captured){
        this.stream_being_captured.getTracks().forEach(track => track.stop());
      }
      
      this.mime_type = null;
      this.mediaRecorder = null;
      this.stream_being_captured = null;
   }
  }

}
