import Head from 'next/head';
import { content } from '~/constants';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
}

const OpenGraph = ({ title, description, image, path }: Props) => {
  const { app, description: defaultDescription, domain } = content;

  const ogTitle = title ? `${title} | ${app}` : app;
  const ogDescription = description || defaultDescription;
  const ogImage = image || `${domain}/icons/apple-touch-icon.png`;
  const ogPath = path ? `${domain}${path}` : domain;

  return (
    <Head>
      <title>{ogTitle}</title>
      <meta name="description" content={ogDescription} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:name" content={app} />
      <meta property="og:site_name" content={app} />
      <meta property="og:url" content={domain} />
      <meta property="og:path" content={ogPath} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:name" content={app} />
      <meta name="twitter:url" content={domain} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@gandannews" />
    </Head>
  );
};

export default OpenGraph;
