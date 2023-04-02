import type { DocumentProps } from 'next/document'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import i18nextConfig from '../../next-i18next.config'

type Props = DocumentProps & {
  locale: string
}

class MyDocument extends Document<Props> {
  render() {
    const currentLocale = this.props.locale
    const { i18n } = i18nextConfig

    return (
      <Html lang={currentLocale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
