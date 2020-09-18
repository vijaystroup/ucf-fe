const playBtn = document.getElementById('start')
const timer = document.getElementById('timer')

function switchTheme() {
  document.body.classList.toggle('dark')
}

function startTimer() {
  timer.innerHTML = -0.50.toFixed(2)

  setInterval(function() {
    let time = +(timer.innerHTML)

    // if (time % 1 == 0 || time % 1 == 59) {
    //   if (time > 0) {
    //     time = time - .40
    //   }
    //   else if (time < 0) {
    //     time = time - .40
    //   }
    // }

    if (time > 1) {
      if (time % 1 == 0) {
        time = time - .40
      }
    }
    else if (time < 1) {
      if (Math.abs(time) % 1 == 59) {
        time = time - .40
      }
    }




    timer.innerHTML = (Math.round((time - .01) * 100) / 100).toFixed(2)
  }, 1000)
}
