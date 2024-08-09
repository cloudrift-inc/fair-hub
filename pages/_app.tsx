// pages/_app.tsx

import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from 'next/head';
import { PageTitle } from '../components/PageTitle';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PageTitle />
      <Head>
        <link rel="icon" href="/logo1.png" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
