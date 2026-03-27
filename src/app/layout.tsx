import { Roboto } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const roboto = Roboto({
 weight: ['300', '400', '500', '700'],
 subsets: ['latin'],
 variable: '--font-roboto',
});

export const metadata: Metadata = {
 metadataBase: new URL(
  process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || 'https://example.com'
 ),
 title: 'Aakash Swain | Frontend Developer',
 description:
  "Aakash Swain's portfolio - Frontend Developer and Web3 Enthusiast. Explore projects and experiences in modern web development.",
 openGraph: {
  title: 'Aakash Swain | Frontend Developer',
  description:
   "Aakash Swain's portfolio - Frontend Developer and Web3 Enthusiast. Explore projects and experiences in modern web development.",
  images: [
   {
    url: '/thumbnail.png',
    width: 1200,
    height: 630,
    alt: 'Aakash Swain Portfolio Thumbnail',
   },
  ],
  locale: 'en_IND',
  type: 'website',
 },
 twitter: {
  card: 'summary_large_image',
  title: 'Aakash Swain | Frontend Developer',
  description:
   "Aakash Swain's portfolio - Frontend Developer and Web3 Enthusiast. Explore projects and experiences in modern web development.",
  images: ['/thumbnail.png'],
 },
};

export default function RootLayout({
 children,
}: Readonly<{ children: React.ReactNode }>) {
 return (
  <html lang="en" className="h-full">
   <head>
    <meta
     name="viewport"
     content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{
      __html: JSON.stringify({
       '@context': 'https://schema.org',
       '@type': 'Person',
       name: 'Aakash Swain',
       url: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || 'https://example.com',
       jobTitle: 'Frontend Developer',
       sameAs: [
        'https://github.com/A3K3SH',
        'https://www.linkedin.com/in/aakashswain18/',
       ],
      }),
     }}
    />
   </head>
   {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
   <body className={`${roboto.variable} h-full`}>
    {children}
    <Toaster />
    <Analytics />
    <SpeedInsights />
   </body>
  </html>
 );
}
