import Head from 'next/head'
import Nav from '../components/nav'
import Pdf from '../components/pdf'
import Code from '../components/code'
import style from '../styles/home.module.scss'
import Footer from '../components/footer'
import { useEffect, useState } from 'react'

export default function Home() {
  const [theme, setTheme] = useState(0)
  const [pdf, setPdf] = useState({
    question: '/misc/instructions.pdf',
    answer: '/misc/instructions.pdf',
    info: 'N/A'
  })
  const [comments, setComments] = useState((
    `// formula sheet: https://ucffe.vijaystroup.com/misc/FE-FormulaSheet.pdf${'\n'}` +
    `// statistics: ${pdf['info']}${'\n\n'}`
  ))

  useEffect(() => console.log(pdf), [pdf])

  function resize(e) {
    e = e.target
    console.log('down')
  }

  useEffect(() => {
    fetch('/api/getQuestion').then(res => res.json()).then(j => setPdf(j))
  }, [])

  return (
    <>
      <Head>
        <title>UCF FE Practice</title>
        <meta name='description' content='UCF Computer Science Foundation Exam rapid pace practice.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={style.all}>
        <Nav pdf={pdf} setPdf={setPdf} />
        <main className={style.main}>
          <section className={style.left}>
            <Pdf />
          </section>
          <div id={style.bar} onMouseDown={e => resize(e)}></div>
          <section className={style.right}>
            <Code theme={theme ? 'light' : 'dark'} comments={comments} />
          </section>
        </main>
        <Footer setTheme={setTheme} />
      </div>
    </>
  )
}
