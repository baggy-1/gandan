import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from '~/components/Layout/AppLayout';
import { emotionTheme, GlobalStyles } from '~/styles';

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={emotionTheme}>
          <GlobalStyles />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
