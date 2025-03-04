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
      <body className={`${pretendard.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
