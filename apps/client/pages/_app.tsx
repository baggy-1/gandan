import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import AppLayout from '~/components/Layout/AppLayout';
import { emotionTheme, GlobalStyles } from '~/styles';

const noneLayoutPaths = ['/oauth/kakao', '/oauth/google'];

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();
  const router = useRouter();

  const Layout = noneLayoutPaths.includes(router.pathname)
    ? React.Fragment
    : AppLayout;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={emotionTheme}>
          <GlobalStyles />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
