export default async function getCategories() {
  const res = await fetch("/questions.json");
  const j = await res.json();

  const data = [];
  const files = Object.values(j);

  for (const categoryData in files) {
    if (data.includes(files[categoryData])) continue;
    else data.push(files[categoryData]);
  }
  [...new Set(data)];
  console.log(data);
  return data;
}
