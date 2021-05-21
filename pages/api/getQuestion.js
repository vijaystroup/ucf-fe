import fs from 'fs'

export default async function handler(req, res) {
  const data = {}
  await fs.readdir('public/question', (err, files) => {
    const file = files[Math.floor(Math.random() * files.length)]
    const n = file.split('.')[0].split('-')[2]
    const month = file.split('.')[0].split('-')[1]

    data['question'] = file
    data['answer'] = `FE-${month}-Sol-${n}.pdf`
    data['info'] = `Info-${month}.pdf`

    res.status(200).json(data)
  })
}
