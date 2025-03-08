import { pretendard } from '@/shared/lib/font';
import { Providers } from '@/shared/providers';

import type { Metadata, Viewport } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Took',
  description: 'Took name service',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="ko">
        <body className={`${pretendard.variable} antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </>
  );
}
