import type { AppProps } from 'next/app';
import GlobalStyles from '~/styles/GlobalStyles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default App;
