'use strict';

var thisScript = $('script[src*=accelerometer2]');
var instName = thisScript.attr('data-inst');
//alert(instName);

// create web audio api context
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var chunks = [];
// var ac = new AudioContext();
// var osc = ac.createOscillator();
var dest = audioCtx.createMediaStreamDestination();
var mediaRecorder = new MediaRecorder(dest.stream);
// osc.connect(dest);

let yodelBuffer;

window.fetch(`/audioTest/${instName}.mp3`)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    yodelBuffer = audioBuffer;
  });

// Global bindings
var threshold = 5;
var timeout = 100;
var interval = 0;
var oldX = null;
var oldY = null;
var oldZ = null;
var oldTime = new Date();
var clicked = false;
var firstShake = true;

// Call this function when the page loads (the "ready" event)
$(document).ready(function () {
  initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  function reset() {
    oldTime = new Date();
    oldX = null;
    oldY = null;
    oldZ = null;
    start = false;
  };
  
  function start() {
    reset();
    window.addEventListener('devicemotion', handleMotion, true);
  };

  start();
  $('#startBtn').hide();
  $('#save').hide();
  $('#audioCont').hide();
  $('.Fbtn').click(btnClick);
  console.log("Javascript connected!");

  $('#modClose').click(function() {
    window.location.href = `/recordingPage/${instName}`;
  });

  $('#modSave').click(function() {
    let title = $('#recordName').val();
    let myUrl = $('audio').attr('src');
    let date = new Date();
    let aud = document.getElementById('audioCont');
    let length = aud.duration;

    $('#title').val(title);
    $('#recURL').val(myUrl);
    $('#date').val(date.toDateString());
    $('#length').val(length);
    $('#form').submit();
  });

  $(document).on('click', '#startBtn', function () {
    if (!clicked) {
      mediaRecorder.start()
      $(this).html('Stop');
      clicked = true;
    } else {
      $(this).hide();
      $('#save').show();
      $('#audioCont').show();
      
      mediaRecorder.requestData();
      mediaRecorder.stop();
      source.stop();
      clicked = false;
    }
  });

  $('#strBtn').click(function() {
    $('#contId2').hide();
    $('.containerPad').show();
  });

  // $('#startBtn').click(function(event) {
  //   if (!clicked) {
  //     mediaRecorder.start()
  //     $(this).html('Stop');
  //     $(this).attr('data-target', '#exampleModal');
  //     clicked = true;
  //   } else {
  //     $(this).html('Start');
  //     // $(this).hide();
  //     mediaRecorder.requestData();
  //     mediaRecorder.stop();
  //     source.stop();
  //     clicked = false;
  //   }
  // });
}

function handleMotion(event) {

  var acc = event.accelerationIncludingGravity;
  var currTime;
  var timeDiff;
  var xDiff = 0;
  var yDiff = 0;
  var zDiff = 0;

  if (oldX === null && oldY === null && oldZ === null) {
    oldX = acc.x;
    oldY = acc.y;
    oldZ = acc.z;
    return;
  }

  xDiff = Math.abs(oldX - acc.x);
  yDiff = Math.abs(oldY - acc.y);
  zDiff = Math.abs(oldZ - acc.z);

  if ((xDiff > threshold && yDiff > threshold) || (xDiff > threshold && zDiff > threshold) || (yDiff > threshold && zDiff > threshold)) {
    currTime = new Date();
    timeDiff = currTime.getTime() - oldTime.getTime();

    if (timeDiff > timeout) {

      if (firstShake) {
        $('#startBtn').show();
        firstShake = false;
      }
      var source = audioCtx.createBufferSource();
      source.buffer = yodelBuffer;
      source.connect(audioCtx.destination);
      source.connect(dest);
      source.start();

      oldTime = new Date();
    }
  }

  oldX = acc.x;
  oldY = acc.y;
  oldZ = acc.z;
}

mediaRecorder.ondataavailable = function(evt) {
  // push each chunk (blobs) in an array
  chunks.push(evt.data);
};
mediaRecorder.onstop = function(evt) {
  // Make blob out of our blobs, and open it.
  var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
  var audioTag = document.createElement('audio');
  document.querySelector("audio").src = URL.createObjectURL(blob);
  //alert(URL.createObjectURL(blob));
};

function stop() {
  window.removeEventListener('devicemotion', handleMotion, true);
  reset();
}

function btnClick(e) {
  var btnName = $(this).data('name');

  switch (btnName) {
      case 0:
          window.history.back();
          break;
      case 1:
          window.location.href = '/';
          break;
      case 2:
          window.location.href = '/recordings';
          break;
      case 3:
          window.location.href = '/profile';
          break;
      // case 4:
      //     $("#startButton").hide();

      //     $("#stopButton").show();
      //     break;
      // case 5:
      //     $("#stopButton").hide();
      //     $("#startButton").show();
      //     break;
  };
}