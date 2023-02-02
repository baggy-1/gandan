import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { emotionTheme, GlobalStyles } from '~/styles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={emotionTheme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
