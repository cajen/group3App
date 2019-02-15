var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

function handleOrientation(event) {
  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]

  output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

  // To make computation easier we shift the range of 
  // x and y to [0,180]
  x += 90;
  y += 90;

  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  ball.style.top  = (maxX*x/180 - 10) + "px";
  ball.style.left = (maxY*y/180 - 10) + "px";
}

function handleMotion(event) {
    var acc = event.acceleration.x;
    var accAndGravity = event.accelerationIncludingGravity.x;
    var rot = event.rotationRate.beta;
    var interval = event.interval;

    output.innerHTML  = "acceleration : " + acc + "\n";
    output.innerHTML += "accleration w/ gravity: " + accAndGravity + "\n";
    output.innerHTML += "rotation: " + rot + "\n";
    output.innerHTML += "interval: " + interval + "\n";


    // create web audio api context
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // create Oscillator node
    var oscillator = audioCtx.createOscillator();

    // oscillator.type = 'square';
    // oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
    // oscillator.connect(audioCtx.destination);
    // oscillator.start();
}

// window.addEventListener('deviceorientation', handleOrientation);
window.addEventListener('devicemotion', handleMotion,true);


