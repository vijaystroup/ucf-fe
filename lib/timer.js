export function startTimer(timer, playBtn, stopBtn) {
  timer.innerHTML = (10.0).toFixed(2).replace(".", ":");
  playBtn.style.display = "none";
  stopBtn.style.display = "block";

  window.clock = setInterval(function () {
    let time = +timer.innerHTML.replace(":", ".");

    if (time > 1) {
      if (time % 1 == 0) {
        time = time - 0.4;
      }
    } else if (time < 1) {
      if ((Math.abs(time) % 1).toFixed(2) == 0.59) {
        time = time - 0.4;
      }
    }

    timer.innerHTML = (Math.round((time - 0.01) * 100) / 100)
      .toFixed(2)
      .replace(".", ":");
  }, 1000);
}

export function stopTimer(playBtn, stopBtn) {
  playBtn.style.display = "block";
  stopBtn.style.display = "none";
  clearInterval(window.clock);
}
