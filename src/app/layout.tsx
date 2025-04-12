import { generateMetaDataSEO } from '@/shared/components/seo/generateMetaData';
import { pretendard } from '@/shared/lib/font';
import { Providers } from '@/shared/providers';

import type { Viewport } from 'next';

import './globals.css';

export async function generateMetadata() {
  return generateMetaDataSEO();
}

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
