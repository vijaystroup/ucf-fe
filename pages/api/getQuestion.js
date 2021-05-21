import { readdirSync } from 'fs'
import { join } from 'path'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

export default async function handler(req, res) {
  const data = {}
  const files = readdirSync(join(serverRuntimeConfig.PROJECT_ROOT, './public/question'))
  console.log(__dirname)

  const file = files[Math.floor(Math.random() * files.length)]
  const n = file.split('.')[0].split('-')[2]
  const month = file.split('.')[0].split('-')[1]

  data['question'] = `/question/${file}`
  data['answer'] = `/answer/FE-${month}-Sol-${n}.pdf`
  data['info'] = `/info/Info-${month}.pdf`

  res.status(200).json(data)
}
