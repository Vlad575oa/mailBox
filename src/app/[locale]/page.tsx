import { Hero } from '@/components/home/Hero';
import { BrandStory } from '@/components/home/BrandStory';
import { ProductBento } from '@/components/home/ProductBento';
import { Reviews } from '@/components/home/Reviews';
import { FAQ } from '@/components/home/FAQ';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://ferrumdecorstudio.shop';

  const languages = {} as Record<string, string>;
  routing.locales.forEach(loc => {
    languages[loc] = `${baseUrl}/${loc}`;
  });

  return {
    title: t('title'),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        ...languages,
        'x-default': `${baseUrl}/de`
      }
    }
  };
}

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#F9F9F7]">
      <Hero />
      <BrandStory />
      <Reviews />
      <FAQ />
    </div>
  );
}
