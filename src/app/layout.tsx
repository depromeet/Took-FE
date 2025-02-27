
import { pretendard } from '@/shared/lib/font';

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
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>{children}</body>
    </html>
  );

}