import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* Global site tag (gtag.js) - Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-154671018-1"></script>
          <script
            dangerouslySetInnerHTML={{__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-154671018-1');
            `}}
          />
        </Head>
        <body className='dark'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
