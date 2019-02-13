var appContents = document.querySelector('.app-contents');
var startMessage = document.querySelector('.start-message');
appContents.style.display = 'block';

// window.addEventListener('keydown', init);
// window.addEventListener('click', handleMotion, true);

function handleMotion(event) {
  appContents.style.display = 'block';
  console.log('yess');
  // document.body.removeChild(startMessage);
  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

  // To make computation easier we shift the range of 
  // x and y to [0,180]
  x += 190;
  y += 190;


    // acc = event.acceleration.x;
    // var accAndGravity = event.accelerationIncludingGravity.x;
    // rot = event.rotationRate.beta;
    // var interval = event.interval;

  // create web audio api context
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioCtx = new AudioContext();

  // create Oscillator and gain node
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();

  // connect oscillator to gain node to speakers

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // create initial theremin frequency and volumn values

  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;

  var maxFreq = 6000;
  var maxVol = 0.02;

  var initialFreq = 3000;
  var initialVol = 0.001;

  // set options for the oscillator


  oscillator.detune.value = 100; // value in cents
  oscillator.start(0);

  oscillator.onended = function() {
    console.log('Your tone has now stopped playing!');
  };

  gainNode.gain.value = initialVol;
  gainNode.gain.minValue = initialVol;
  gainNode.gain.maxValue = initialVol;

  // Mouse pointer coordinates

  var CurX;
  var CurY;

  // Get new mouse pointer coordinates when mouse is moved
  // then set new gain and pitch values

  document.onmousemove = updatePage;

  function updatePage(e) {
      KeyFlag = false;

      CurX = x;
      CurY = y;
      // CurX = Math.abs(acc+200);
      // CurY = Math.abs(rot+200);
      // CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
      // CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

      console.log(CurX);
      console.log(CurY);
      oscillator.frequency.value = (CurX/WIDTH) * maxFreq;
      gainNode.gain.value = (CurY/HEIGHT) * maxVol;

      canvasDraw();
  }

  // mute button

  var mute = document.querySelector('.mute');

  mute.onclick = function() {
    if(mute.getAttribute('data-muted') === 'false') {
      gainNode.disconnect(audioCtx.destination);
      mute.setAttribute('data-muted', 'true');
      mute.innerHTML = "Unmute";
    } else {
      gainNode.connect(audioCtx.destination);
      mute.setAttribute('data-muted', 'false');
      mute.innerHTML = "Mute";
    };
  }



  // canvas visualization

  function random(number1,number2) {
    var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
    return randomNo;
  }

  var canvas = document.querySelector('.canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  var canvasCtx = canvas.getContext('2d');

  function canvasDraw() {
    if(KeyFlag == true) {
      rX = KeyX;
      rY = KeyY;
    } else {
      rX = CurX;
      rY = CurY;
    }
    rC = Math.floor((gainNode.gain.value/maxVol)*30);

    canvasCtx.globalAlpha = 0.2;

    for(i=1;i<=15;i=i+2) {
      canvasCtx.beginPath();
      canvasCtx.fillStyle = 'rgb(' + 100+(i*10) + ',' + Math.floor((gainNode.gain.value/maxVol)*255) + ',' + Math.floor((oscillator.frequency.value/maxFreq)*255) + ')';
      canvasCtx.arc(rX+random(0,50),rY+random(0,50),rC/2+i,(Math.PI/180)*0,(Math.PI/180)*360,false);
      canvasCtx.fill();
      canvasCtx.closePath();
    }
  }

  // clear screen

  var clear = document.querySelector('.clear');

  clear.onclick = function() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // keyboard controls

  var body = document.querySelector('body');

  var KeyX = 1;
  var KeyY = 0.01;
  var KeyFlag = false;

  body.onkeydown = function(e) {
    KeyFlag = true;

    // 37 is arrow left, 39 is arrow right,
    // 38 is arrow up, 40 is arrow down

    if(e.keyCode == 37) {
      KeyX -= 20;
    }

    if(e.keyCode == 39) {
      KeyX += 20;
    }

    if(e.keyCode == 38) {
      KeyY -= 20;
    }

    if(e.keyCode == 40) {
      KeyY += 20;
    }

    // set max and min constraints for KeyX and KeyY

    if(KeyX < 1) {
      KeyX = 1;
    }

    if(KeyX > WIDTH) {
      KeyX = WIDTH;
    }

    if(KeyY < 0.01) {
      KeyY = 0.01;
    }

    if(KeyY > HEIGHT) {
      KeyY = HEIGHT;
    }

    oscillator.frequency.value = (KeyX/WIDTH) * maxFreq;
    gainNode.gain.value = (KeyY/HEIGHT) * maxVol;

    canvasDraw();
  };

}

// window.addEventListener('devicemotion', handleMotion, true);
window.addEventListener('deviceorientation', handleMotion, true);

