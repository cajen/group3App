'use strict';

var thisScript = $('script[src*=accelerometer2]');
var instName = thisScript.attr('data-inst');

// create web audio api context
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var chunks = [];
var dest = audioCtx.createMediaStreamDestination();
var mediaRecorder = new MediaRecorder(dest.stream);

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

  // $('#modSave').click( function() {
  //   ga("send", "event", 'save', 'click');
  // });

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
  
  $('#startBtn').attr('disabled', 'disabled');
  $('#save').hide();
  $('#audioCont').hide();
  $('.Fbtn').click(btnClick);

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
      let timeSincePageLoad = Math.round(performance.now());
      ga('send', 'timing', 'JS Dependencies', 'click', timeSincePageLoad);
      mediaRecorder.start()
      $(this).html('Stop');
      clicked = true;
    } else {
      $(this).hide();
      $('#save').show();
      $('#audioCont').show();
      
      mediaRecorder.requestData();
      mediaRecorder.stop();
      //source.stop();
      clicked = false;
    }
  });

  $('#resetBtn').click(function() {
    window.location.href = `/recordingPage/${instName}`;
  });
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
        $('#startBtn').removeAttr('disabled');
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
}

mediaRecorder.onstop = function(evt) {
  // Make blob out of our blobs, and open it.
  // let blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
  //var audioTag = document.createElement('audio');
  document.querySelector("audio").src = URL.createObjectURL(new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' }));
  //alert(URL.createObjectURL(blob));
}

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
  };
}