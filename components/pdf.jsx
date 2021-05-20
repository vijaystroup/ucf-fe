import style from '../styles/pdf.module.scss'

export default function Pdf() {
  return (
    <iframe id={style.pdf} src='/misc/instructions.pdf' />
  )
}
