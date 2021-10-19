import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='es'>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Montserrat&display=swap`"
            rel="stylesheet"
          />
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
