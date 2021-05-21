import style from '../styles/pdf.module.scss'

export default function Pdf({ question }) {
  return (
    <iframe id={style.pdf} src={question} />
  )
}
