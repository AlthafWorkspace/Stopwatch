var startTime, elapsedTime = 0;
var timerId;

var timerDisplay = document.getElementById('timer');
var startButton = document.getElementById('startBtn');
var stopButton = document.getElementById('stopBtn');
var resetButton = document.getElementById('resetBtn');
var lapTimes = [];
var lapButton = document.getElementById('lapBtn');
var lapTimesDisplay = document.getElementById('lapTimes');
// Adding Event Listner for each button behaviour
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLapTime);

function startTimer() {
  if (!timerId) {
    startTime = Date.now() - elapsedTime;
    timerId = requestAnimationFrame(updateTimer);
  }
}

function stopTimer() {
  if (timerId) {
    cancelAnimationFrame(timerId);
    timerId = null;
  }
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  timerDisplay.textContent = formatTime(elapsedTime); // Update the timer display with zero time
  startTime = null;
}

/* In the update timer function we are updating the time
    By calculating the Elapsed time which is done by subractinng start and current time.
    After that we are formating the time and getting only time part which we needed.
    */
function updateTimer() {
  var currentTime = Date.now();                     
  elapsedTime = currentTime - startTime;            
  var formattedTime = formatTime(elapsedTime);
  timerDisplay.textContent = formattedTime;
  timerId = requestAnimationFrame(updateTimer);
}

function formatTime(time) {
    var ms = time % 1000;                     // Extract the milliseconds part
    time = Math.floor(time / 1000);           // Convert to seconds
    var secs = time % 60;                     // Extract the seconds part
    time = Math.floor(time / 60);             // Convert to minutes
    var mins = time % 60;                     // Extract the minutes part
    var hours = Math.floor(time / 60);        // Convert to hours
  
    return pad(hours) + ':' + pad(mins) + ':' + pad(secs) + '.' + padMs(ms);  // Return the formatted time string
  }
  
  function recordLapTime() {
    if (startTime) {
      var lapTime = elapsedTime;
      lapTimes.push(lapTime);
      displayLapTimes();
    }
  }
  

  function displayLapTimes() {
    lapTimesDisplay.innerHTML = '';
  
    for (var i = 0; i < lapTimes.length; i++) {
      var lapNumber = i + 1;
      var lapTime = lapTimes[i];
      var lapTimeFormatted = formatTime(lapTime);
  
      var lapItem = document.createElement('li');
      lapItem.textContent = 'Lap ' + lapNumber + ': ' + lapTimeFormatted;
      lapTimesDisplay.appendChild(lapItem);
    }
  }

function pad(num) {
  return num.toString().padStart(2, '0');
}

function padMs(num) {
  return num.toString().padStart(3, '0');
}
