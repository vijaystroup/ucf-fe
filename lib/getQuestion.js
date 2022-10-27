export default async function getQuestion(category) {
  const res = await fetch("/questions.json");
  const j = await res.json();

  const data = {};
  const categories = [];
  const filesInfo = Object.entries(j);
  const files = Object.keys(j);
  for (const [fileName, fileData] of filesInfo) {
    if (fileData === category) {
      categories.push(fileName);
    } else {
      continue;
    }
  }

  const file = files[Math.floor(Math.random() * files.length)];
  const n = file.split(".")[0].split("-")[2];
  const month = file.split(".")[0].split("-")[1];

  data["question"] = `/question/${file}`;
  data["answer"] = `/answer/FE-${month}-Sol-${n}.pdf`;
  data["info"] = `/info/Info-${month}.pdf`;

  return data;
}
