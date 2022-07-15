import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='es'>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Montserrat:wght@300;400;500;700;900&display=swap`"
            rel="stylesheet"
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-6DBQ695085"></script>
          <script>{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6DBQ695085');`}</script>
        </Head>
        <body>
          <script>0</script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument
