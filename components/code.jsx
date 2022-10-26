import { useState } from "react";
import Editor from "@monaco-editor/react";
import style from "../styles/code.module.scss";

export default function Code({ theme, comments }) {
  const [code, setCode] = useState(comments);
  const [output, setOutput] = useState("");

  async function run() {
    const res = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "c",
        version: "10.2.0",
        files: [
          {
            content: code,
          },
        ],
      }),
    });

    if (!res.ok) {
      setOutput("Too many requests. Please try again later.");
      return;
    }

    const data = await res.json();
    setOutput(data.run.output);
  }

  return (
    <div className={style.code}>
      <div className={style.editorWrapper1}>
        <Editor
          defaultLanguage="cpp"
          theme={`vs-${theme}`}
          value={code}
          onChange={(e) => setCode(e)}
        />
      </div>

      <div className={style.runWrapper}>
        <button className={style.run} onClick={run}>
          Run
        </button>
      </div>

      <div className={style.editorWrapper2}>
        <Editor defaultLanguage="txt" theme={`vs-${theme}`} value={output} />
      </div>
    </div>
  );
}
