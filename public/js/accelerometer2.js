 // create web audio api context
 var AudioContext = window.AudioContext || window.webkitAudioContext;
 var audioCtx = new AudioContext();
 var interval = 0;

function handleMotion(event) {

  acc = event.acceleration.z;
  var accAndGravity = event.accelerationIncludingGravity.z;
  rot = event.rotationRate.beta;
  var intvl = event.interval;
  interval++;

  if ( Math.abs(acc) > 2 && (interval%16) == 0) {
    console.log(interval);
  
    // create Oscillator and gain node
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    // connect oscillator to gain node to speakers

    oscillator.connect(gainNode);
    oscillator.type = 'sine';
    gainNode.connect(audioCtx.destination);
    oscillator.start(0);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.5);
  } 
}

window.addEventListener('devicemotion', handleMotion, true);
//window.addEventListener('deviceorientation', handleMotion, true);
