import Head from 'next/head';

import { pretendard } from '@/shared/lib/font';
import { Providers } from '@/shared/providers';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Took',
  description: 'Took name service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <body className={`${pretendard.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
