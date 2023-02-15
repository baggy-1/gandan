import { Html, Head, Main, NextScript } from 'next/document';
import { content } from '~/constants';

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <Meta />
        <IconLink />
        <link
          rel="stylesheet"
          type="text/css"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard-dynamic-subset.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

const Meta = () => {
  const { app, description, domain } = content;

  return (
    <>
      <meta name="application-name" content={app} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-name" content={app} />
      <meta name="description" content={description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={domain} />
      <meta name="twitter:name" content={app} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`${domain}/icons/android-chrome-192x192.png`}
      />
      <meta name="twitter:creator" content="@gandannews" />
      <meta property="og:type" content="website" />
      <meta property="og:name" content={app} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={app} />
      <meta property="og:url" content={domain} />
      <meta
        property="og:image"
        content={`${domain}/icons/apple-touch-icon.png`}
      />
    </>
  );
};

const IconLink = () => {
  return (
    <>
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
    </>
  );
};

export default Document;
