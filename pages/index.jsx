import Nav from "../components/nav";
import Pdf from "../components/pdf";
import Code from "../components/code";
import style from "../styles/home.module.scss";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import getQuestion from "../lib/getQuestion";
import getCategories from "../lib/getCategories";
export default function Home() {
  const [theme, setTheme] = useState(0);
  const [pdf, setPdf] = useState({
    question: "/misc/instructions.pdf",
    answer: "/misc/instructions.pdf",
    info: "N/A",
  });
  const [comments, setComments] = useState(
    `// formula sheet: https://ucffe.vijaystroup.com/misc/FE-FormulaSheet.pdf${"\n"}` +
      `// statistics: ${pdf["info"]}${"\n\n"}` +
      'int main(void) {\n    printf("Charge On!");\n    return 0;\n}\n'
  );
  const [filterCategories, setFilteredCategories] = useState([]);
  const [category, setCategory] = useState("DSN");
  useEffect(async () => {
    setFilteredCategories(await getCategories());
    const resizer = document.getElementById(style.bar);
    const pdfElement = document.getElementById("pdf");
    resizer.onmousedown = () => {
      pdfElement.style.zIndex = -1;
      resizer.parentNode.onmousemove = (ev) => {
        if (window.innerWidth > 700) {
          resizer.previousElementSibling.style.width =
            ev.clientX - resizer.offsetWidth / 2 + "px";
          resizer.nextElementSibling.style.width =
            resizer.parentNode.offsetWidth -
            ev.clientX -
            resizer.offsetWidth / 2 +
            "px";
        }
      };
    };
    resizer.onmouseup = () => {
      resizer.parentNode.onmousemove = undefined;
      pdfElement.style.zIndex = 1;
    };
  }, []);

  return (
    <>
      <div className={style.all}>
        <Nav
          pdf={pdf}
          setPdf={setPdf}
          setComments={setComments}
          setCategory={setCategory}
          category={category}
          categories={filterCategories}
        />
        <main className={style.main}>
          <section className={style.left}>
            <Pdf />
          </section>
          <div className="resizer" id={style.bar}></div>
          <section className={style.right}>
            <Code theme={theme ? "light" : "dark"} comments={comments} />
          </section>
        </main>
        <Footer setTheme={setTheme} />
      </div>
    </>
  );
}
