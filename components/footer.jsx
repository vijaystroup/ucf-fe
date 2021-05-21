import style from '../styles/footer.module.scss'

export default function Footer({ setTheme }) {
  const theme = (
    <svg
      id={style.theme}
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 16 16'
      onClick={switchTheme}
    >
      <path d='M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z'/>
    </svg>
  )

  function switchTheme() {
    const theme = document.body.className

    if (theme == 'light') {
      document.body.className = 'dark'
      setTheme(0)
    } else {
      document.body.className = 'light'
      setTheme(1)
    }
  }

  return (
    <footer className={style.footer}>
      <p>Made by <a href='https://www.vijaystroup.com'>Vijay Stroup</a> for my fellow Knights</p>
      <a id={style.donate} href='https://paypal.me/vijaystroup' target='_blank'>❤️ Donate</a>
      {theme}
    </footer>
  )
}
