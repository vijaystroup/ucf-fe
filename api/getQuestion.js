import { readdirSync } from 'fs'
import { join } from 'path'

const getData = (req, res) => {
  const data = {}
  const files = readdirSync(join(__dirname, './question'))
  
  const file = files[Math.floor(Math.random() * files.length)]
  const n = file.split('.')[0].split('-')[2]
  const month = file.split('.')[0].split('-')[1]
  
  data['question'] = `/question/${file}`
  data['answer'] = `/answer/FE-${month}-Sol-${n}.pdf`
  data['info'] = `/info/Info-${month}.pdf`

  return data
}

exports.getData = getData
