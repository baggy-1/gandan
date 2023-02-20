import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import React from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useRouter } from 'next/router';
import AppLayout from '~/components/Layout/AppLayout';
import { emotionTheme, GlobalStyles } from '~/styles';
import ToastContainer from '~/components/common/Toast/components/ToastContainer';

const noneLayoutPaths = ['/oauth/kakao', '/oauth/google'];

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const router = useRouter();

  const Layout = noneLayoutPaths.includes(router.pathname)
    ? React.Fragment
    : AppLayout;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={emotionTheme}>
            <GlobalStyles />
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ToastContainer />
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default App;
