import { useEffect, useState } from "react";
import getQuestion from "../lib/getQuestion";
import { startTimer, stopTimer } from "../lib/timer";
import style from "../styles/nav.module.scss";
export default function Nav({
  pdf,
  setPdf,
  setComments,
  setCategory,
  category,
  categories,
}) {
  const play = (
    <svg
      id={style.play}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
      onClick={playStop}
    >
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
    </svg>
  );
  const stop = (
    <svg
      id={style.stop}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
      onClick={playStop}
    >
      <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
    </svg>
  );

  const [played, setPlayed] = useState(false);
  const [history, setHistory] = useState([]);

  async function playStop() {
    const timer = document.getElementById("timer");
    const playBtn = document.getElementById(style.play);
    const stopBtn = document.getElementById(style.stop);
    const pdfElement = document.getElementById("pdf");

    if (played) {
      pdfElement.src = pdf["answer"];
      setHistory([
        ...history,
        pdf["answer"].replace("/answer/", "").replace(".pdf", ""),
      ]);

      stopTimer(playBtn, stopBtn);
    } else {
      const hijackedPDF = await getQuestion(category);
      pdfElement.src = hijackedPDF["question"];
      setComments(
        `// formula sheet: https://ucffe.vijaystroup.com/misc/FE-FormulaSheet.pdf${"\n"}` +
          `// statistics: https://ucffe.vijaystroup.com${pdf["info"]}${"\n\n"}`
      );
      startTimer(timer, playBtn, stopBtn);
      // Sets pdf for modified state for the solution
      setPdf(hijackedPDF);
    }
    setPlayed(!played);
  }

  function viewHistory(e) {
    const pdfElement = document.getElementById("pdf");
    pdfElement.src = `/answer/${e.target.value}.pdf`;
  }
  function setCategoryName(e) {
    const categoryName = e.target.value;
    setCategory(categoryName);
  }
  return (
    <header>
      <nav className={style.nav}>
        <h1 className={style.title}>UCF FE Practice</h1>
        <div className={style.controls}>
          <select name="filterCategory" onChange={setCategoryName} multiple>
            <option value="filter" disabled>
              Filter by Category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select name="history" defaultValue="history" onChange={viewHistory}>
            <option value="history" disabled>
              History
            </option>
            {history.map((h) => (
              <option
                key={`${h}${Math.floor(Math.random() * 100000)}`}
                value={h}
              >
                {h}
              </option>
            ))}
          </select>
          {play}
          {stop}
          <p id="timer">00:00</p>
        </div>
      </nav>
    </header>
  );
}
