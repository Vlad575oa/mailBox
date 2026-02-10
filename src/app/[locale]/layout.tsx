import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://ferrumdecorstudio.shop';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | FerrumDecor',
      default: t('title'),
    },
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}`,
      siteName: 'FerrumDecor',
      images: [
        {
          url: '/images/Custom_Wall_mount_Corten_steel_mailbox.jpg',
          width: 1200,
          height: 630,
        },
      ],
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
    },
  };
}

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
            <WhatsAppButton />
          </SmoothScroll>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'FerrumDecor',
              image: 'https://ferrumdecorstudio.shop/images/logo.png',
              description: locale === 'de' ? 'Premium handgefertigte Briefkästen aus Cortenstahl und Messing.' : 'Premium handcrafted Corten steel and brass mailboxes.',
              url: `https://ferrumdecorstudio.shop/${locale}`,
              priceRange: '$$$',
              address: {
                '@type': 'PostalAddress',
                addressCountry: locale === 'de' ? 'DE' : 'US'
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
