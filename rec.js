// Taken from:
// https://blog.addpipe.com/using-recorder-js-to-capture-wav-audio-in-your-html5-web-site/
//https://github.com/addpipe/simple-recorderjs-demo


//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;
var gumStream;
//stream from getUserMedia()
var rec;
//Recorder.js object
var input;
//MediaStreamAudioSourceNode we'll be recording
// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext;
//new audio context to help us record
var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");
//add events to those 3 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
pauseButton.addEventListener("click", pauseRecording);


function startRecording() {
  console.log("recordButton clicked");

  /* Simple constraints object, for more advanced audio features see

  https://addpipe.com/blog/audio-constraints-getusermedia/ */

  var constraints = {
      audio: true,
      video: false
  }
  /* Disable the record button until we get a success or fail from getUserMedia() */

  recordButton.disabled = true;
  stopButton.disabled = false;
  pauseButton.disabled = false

  /* We're using the standard promise based getUserMedia()

  https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia */

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
      /* assign to gumStream for later use */
      gumStream = stream;
      /* use the stream */
      input = audioContext.createMediaStreamSource(stream);
      /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
      rec = new Recorder(input, {
          numChannels: 1
      })
      //start the recording process
      rec.record()
      console.log("Recording started");
      // Including base-track media sync
      if (document.getElementById("syncAudio").checked) {
          document.getElementById("beat").currentTime = 0;
          document.getElementById("beat").play();
      }
  }).catch(function(err) {
      //enable the record button if getUserMedia() fails
      recordButton.disabled = false;
      stopButton.disabled = true;
      pauseButton.disabled = true
  });
}

function pauseRecording() {
    console.log("pauseButton clicked rec.recording=", rec.recording);
    if (rec.recording) {
        //pause
        rec.stop();
        // Including base-track media sync
        if (document.getElementById("syncAudio").checked) {
            document.getElementById("beat").pause();
        }
        pauseButton.innerHTML = "<img src='img/resume.png' height=40px/>";
    } else {
        //resume
        rec.record()
        // Including base-track media sync
        if (document.getElementById("syncAudio").checked) {
            document.getElementById("beat").play();
        }
        pauseButton.innerHTML = "<img src='img/pause.png' height=40px/>";
    }
}

function stopRecording() {
    console.log("stopButton clicked");
    //disable the stop button, enable the record too allow for new recordings
    stopButton.disabled = true;
    recordButton.disabled = false;
    pauseButton.disabled = true;
    //reset button just in case the recording is stopped while paused
    pauseButton.innerHTML = "<img src='img/pause.png' height=40px/>";
    //tell the recorder to stop the recording
    rec.stop(); //stop microphone access
    // Including base-track media sync
    if (document.getElementById("syncAudio").checked) {
        document.getElementById("beat").pause();
        document.getElementById("beat").currentTime = 0;
    }
    gumStream.getAudioTracks()[0].stop();
    //create the wav blob and pass it on to createDownloadLink
    rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('div');
    var link = document.createElement('a');
    var link2 = document.createElement('a');
    //add controls to the <audio> element
    au.controls = true;
    au.src = url;
    //link the a element to the blob
    link.href = url;
    link.download = new Date().toISOString() + '.wav';
    // link.innerHTML = link.download;
    link.innerHTML = "<img src='img/download_round.png' height=40px style='padding-left: 10px; margin:0; transform: translate(0,5px)'/>";
    //add the new audio and a elements to the li element
    link2.href = "#";
    link2.onclick = function(){ document.getElementById(link.download).remove(); };
    // link.innerHTML = link.download;
    link2.innerHTML = "<img src='img/trash_round.png' height=40px style='padding-left: 10px; margin:0; transform: translate(0,5px)'/>";

    li.appendChild(au);
    li.appendChild(link);
    li.appendChild(link2);
    li.id = link.download;
    li.style.display = 'inline-flex';
    // li.style.verticalAlign = 'middle';

    // var filename = new Date().toISOString();
    // //filename to send to server without extension
    // //upload link
    // var upload = document.createElement('a');
    // upload.href = "#";
    // upload.innerHTML = "Upload";
    // upload.addEventListener("click", function(event) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.onload = function(e) {
    //         if (this.readyState === 4) {
    //             console.log("Server returned: ", e.target.responseText);
    //         }
    //     };
    //     var fd = new FormData();
    //     fd.append("audio_data", blob, filename);
    //     xhr.open("POST", "upload.php", true);
    //     xhr.send(fd);
    // })
    // li.appendChild(document.createTextNode(" ")) //add a space in between
    // li.appendChild(upload) //add the upload link to li

    //add the li element to the ordered list
    recordingsList.appendChild(li);
}
