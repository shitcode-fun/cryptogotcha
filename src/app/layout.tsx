import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'CryptoGotcha (GOTCHA)',
  description:
    'CryptoGotchi Web3 application on Base L2. Hatch, nurture, and trade virtual pets.',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'CryptoGotcha (GOTCHA)',
    description:
      'CryptoGotchi Web3 application on Base L2. Hatch, nurture, and trade virtual pets.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://cryptogotcha.com',
    siteName: 'CryptoGotcha',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoGotcha (GOTCHA)',
    description:
      'CryptoGotchi Web3 application on Base L2. Hatch, nurture, and trade virtual pets.',
    creator: '@gtopolice',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-blue-600 px-2 py-1 rounded"
          >
            Skip to content
          </a>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main id="main-content" className="flex-grow pt-16 px-4 sm:px-8">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
