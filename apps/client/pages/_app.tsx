import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import AppLayout from '~/components/Layout/AppLayout';
import { emotionTheme, GlobalStyles } from '~/styles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={emotionTheme}>
        <GlobalStyles />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </>
  );
};

export default App;
