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
          <script dangerouslySetInnerHTML={{__html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6DBQ695085');`}} />

<meta property="fb:pages" content="1828485257382835" />

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6386501791573221"
     crossOrigin="anonymous"></script>


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
