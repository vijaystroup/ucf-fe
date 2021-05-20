import style from '../styles/pdf.module.scss'

export default function Pdf() {
  return (
    <iframe id={style.pdf} src='http://www.africau.edu/images/default/sample.pdf' />
  )
}
