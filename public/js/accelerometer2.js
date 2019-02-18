'use strict';

// create web audio api context
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

let yodelBuffer;

window.fetch('/audioTest/13862.mp3')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    yodelBuffer = audioBuffer;
  });

// Global bindings
var threshold = 4;
var timeout = 100;
var interval = 0;
var oldX = null;
var oldY = null;
var oldZ = null;
var oldTime = new Date();

// Call this function when the page loads (the "ready" event)
$(document).ready(function () {
  initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  $("button").click(btnClick);
  console.log("Javascript connected!");
  start();
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

      let source = audioCtx.createBufferSource();
      source.buffer = yodelBuffer;
      source.connect(audioCtx.destination);
      source.start();

      // create Oscillator and gain node
      // var oscillator = audioCtx.createOscillator();
      // var gainNode = audioCtx.createGain();

      // // connect oscillator to gain node to speakers

      // oscillator.connect(gainNode);
      // oscillator.type = 'sine';
      // gainNode.connect(audioCtx.destination);
      // oscillator.start(0);
      // gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.8);

      oldTime = new Date();
    }
  }

  oldX = acc.x;
  oldY = acc.y;
  oldZ = acc.z;
}

function reset() {
  oldTime = new Date();
  oldX = null;
  oldY = null;
  oldZ = null;
}

function start() {
  reset();
  window.addEventListener('devicemotion', handleMotion, true);
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
      case 3:
          window.location.href = '/profile';
          break;
      case 4:
          $("#startButton").hide();
          $("#stopButton").show();
          break;
      case 5:
          $("#stopButton").hide();
          $("#startButton").show();
          break;
  };
}