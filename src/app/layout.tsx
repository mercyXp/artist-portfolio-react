import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rich Zenzi Art | Professional Artist Portfolio',
  description:
    'Explore the portfolio of Richard Munzenzi, a professional artist creating sketches, illustrations, and vibrant custom commissions.',
  keywords: 'Richard Munzenzi, Rich Zenzi Art, artist portfolio, sketches, custom commissions, art collection, portraits',
  authors: [{ name: 'Richard Munzenzi' }],
  openGraph: {
    title: 'Rich Zenzi Art',
    description: 'Timothy-less portraits and artwork capturing the human spirit.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--bg-color)] text-[var(--text-color)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
