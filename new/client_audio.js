class client_audio {
  audioBlobs = [];
  mediaRecorder = null;
  streamBeingCaptured =null;
  
  constructor(){
    this.reset();
  }

  reset(){
    this.audioBlobs = [];
    this.mediaRecorder = null;
    this.streamBeingCaptured =null;
  }

  init(){
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      return Promise.reject(new Error('mediaDevices API or getUserMedia method is not supported in this browser.'));
    }
    else{
      return navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            client_audio.streamBeingCaptured = stream;
            client_audio.mediaRecorder = new MediaRecorder(stream);
            client_audio.audioBlobs = [];
          
            client_audio.mediaRecorder.addEventListener("dataavailable", event => {
                client_audio.audioBlobs.push(event.data);
            });
            client_audio.mediaRecorder.start();
        });
    }
  }

  record(){
    client_audio.start()
      .then(() => {
        console.log("Recording");
      })
      .catch(error => {
        if (error.message.includes("mediaDevices API or getUserMedia method is not supported in this browser.")) {       
          console.log("To record audio, use browsers like Chrome and Firefox.");
        }
      });
  }

  stop(){
    return new Promise(resolve => {
      let mimeType = client_audio.mediaRecorder.mimeType;
  
         
      client_audio.mediaRecorder.addEventListener("stop", () => {
        let audioBlob = new Blob(client_audio.audioBlobs, { type: mimeType });     
        resolve(audioBlob);
      });
      client_audio.mediaRecorder.stop();
      client_audio.streamBeingCaptured.getTracks().forEach(track => track.stop());
      client_audio.mediaRecorder = null;
      client_audio.streamBeingCaptured = null;
    });

  }

}
