const playStop = document.getElementById('play-stop')
const playBtn = playStop.firstElementChild
const timer = document.getElementById('timer')

function switchTheme() {
  document.body.classList.toggle('dark')
}

function makeStopBtn() {
  const stopBtn = playBtn.cloneNode()
  stopBtn.classList = 'fas fa-stop'
  stopBtn.id = 'stop'

  stopBtn.addEventListener('click', function() {
    stopTimer(stopBtn)
  })

  return stopBtn
}

function startTimer() {
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
  stopBtn.remove()
  playStop.append(playBtn)
  clearInterval(window.clock)
}

playBtn.addEventListener('click', function() {
  startTimer()
})
