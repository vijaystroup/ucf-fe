import style from '../styles/pdf.module.scss'

export default function Pdf({ pdf }) {
  return (
    <iframe id={style.pdf} src={pdf} />
  )
}
