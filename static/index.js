const playBtn = document.getElementById('start')
const timer = document.getElementById('timer')

function switchTheme() {
  document.body.classList.toggle('dark')
}

function startTimer() {
  timer.innerHTML = 10.00.toFixed(2).replace('.', ':')

  setInterval(function() {
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
