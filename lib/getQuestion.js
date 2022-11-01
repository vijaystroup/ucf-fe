export default async function getQuestion(category) {
  const res = await fetch("/questions.json");
  const j = await res.json();
  let splitCategories = category.split("and").join().split("/");
  const data = {};
  const categories = [];
  const filesInfo = Object.entries(j);

  for (const [fileName, fileData] of filesInfo) {
    if (splitCategories.includes(fileData)) {
      categories.push(fileName);
    } else {
      continue;
    }
  }
  const file = categories[Math.floor(Math.random() * categories.length)];
  const n = file.split(".")[0].split("-")[2];
  const month = file.split(".")[0].split("-")[1];

  data["question"] = `/question/${file}`;
  data["answer"] = `/answer/FE-${month}-Sol-${n}.pdf`;
  data["info"] = `/info/Info-${month}.pdf`;
  return data;
}
