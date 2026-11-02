import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://samariatech.com'),
  title: 'Samaria Tech | Web Development, Software & Tech Solutions',
  description:
    'Samaria Tech builds high-performance websites, custom web applications, and practical tech solutions for businesses.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Samaria Tech | Web Development, Software & Tech Solutions',
    description:
      'Samaria Tech builds high-performance websites, custom web applications, and practical tech solutions for businesses.',
    url: 'https://samariatech.com',
    siteName: 'Samaria Tech',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'Samaria Tech',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samaria Tech | Web Development, Software & Tech Solutions',
    description:
      'Samaria Tech builds high-performance websites, custom web applications, and practical tech solutions for businesses.',
    images: ['/icon-512.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
