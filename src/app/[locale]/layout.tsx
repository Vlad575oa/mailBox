import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'FerrumDecor | Premium Corten Steel & Brass Mailboxes',
  description: 'Handcrafted steel, brass, and Corten mailboxes. Modern design, timeless durability, and personalized for your home.',
  keywords: ['mailboxes', 'corten steel', 'modern mailbox', 'custom mailbox', 'brass mailbox'],
  openGraph: {
    title: 'FerrumDecor | Premium Custom Mailboxes',
    description: 'Elevate your home exterior with our handcrafted Corten steel and brass mailboxes.',
    url: 'https://ferrumdecorstudio.shop', // Base URL assumption
    siteName: 'FerrumDecor',
    images: [
      {
        url: '/images/Custom_Wall_mount_Corten_steel_mailbox.jpg', // Default OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'FerrumDecor',
              image: 'https://ferrumdecorstudio.shop/images/logo.png', // Fallback
              description: 'Premium handcrafted Corten steel and brass mailboxes.',
              url: 'https://ferrumdecorstudio.shop',
              priceRange: '$$$',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'US' // Approximate
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
