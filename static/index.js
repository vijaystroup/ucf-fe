// elements
const playStop = document.getElementById('play-stop')
const playBtn = playStop.firstElementChild
const timer = document.getElementById('timer')
const reportDiv = document.getElementsByClassName('report')
const pdf = document.getElementById('pdf')
const stats = document.getElementById('stats')
const textArea = document.getElementsByTagName('textarea')[0]

// theme
localStorage.getItem('theme')
  ? document.body.className = localStorage.getItem('theme')
  : (
    localStorage.setItem('theme', 'light'),
    document.body.className = 'light'
  )

function switchTheme() {
  // document.body.classList.toggle('dark')
  const theme = document.body.className

  if (theme == 'light') {
    document.body.className = 'dark'
  }
  else {
    document.body.className = 'light'
  }
  localStorage.setItem('theme', document.body.className)
}

// stop button
function makeStopBtn() {
  const stopBtn = playBtn.cloneNode()
  stopBtn.classList = 'fas fa-stop'
  stopBtn.id = 'stop'

  stopBtn.addEventListener('click', function() {
    stopTimer(stopBtn)
  })

  return stopBtn
}

// timer
function startTimer() {
  pdf.src = data.question
  stats.href = data.info
  stats.target = '_blank'

  textArea.value = 'Your solution here...'

  
  timer.innerHTML = 10.00.toFixed(2).replace('.', ':')
  playBtn.remove()
  playStop.append(makeStopBtn())
  
  window.clock = setInterval(function() {
    let time = +(timer.innerHTML.replace(':', '.'))
    
    if (time > 1) {
      if (time % 1 == 0) {
        time = time - .40
      }
    }
    else if (time < 1) {
      if ((Math.abs(time) % 1).toFixed(2) == .59) {
        time = time - .40
      }
    }
    
    timer.innerHTML = (Math.round((time - .01) * 100) / 100).toFixed(2).replace('.', ':')
  }, 1000)
}

function stopTimer(stopBtn) {
  fetchExam()
  pdf.src = data.answer
  stopBtn.remove()
  playStop.append(playBtn)
  clearInterval(window.clock)
}

playBtn.addEventListener('click', function() {
  startTimer()
})

// textarea tab
textArea.onkeydown = function(e) {
  if (e.keyCode == 9 || e.which == 9) {
      e.preventDefault();
      var s = this.selectionStart;
      this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
      this.selectionEnd = s+1; 
  }
}

// api
fetchExam() // inital fetch
let data;
function fetchExam() {
  try {
      fetch('/question')
        .then (function(u) {return u.json()})
        .then (function(json) {data = json})
  } catch (error) {
      console.error(error);
  }
}
