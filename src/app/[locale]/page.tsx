import { Hero } from '@/components/home/Hero';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

// Lazy load below-fold components to reduce initial bundle size
const BrandStory = dynamic(() => import('@/components/home/BrandStory').then(mod => ({ default: mod.BrandStory })), {
  loading: () => <div className="min-h-screen bg-white" />
});
const Reviews = dynamic(() => import('@/components/home/Reviews').then(mod => ({ default: mod.Reviews })), {
  loading: () => <div className="min-h-screen bg-gray-50" />
});
const FAQ = dynamic(() => import('@/components/home/FAQ').then(mod => ({ default: mod.FAQ })), {
  loading: () => <div className="min-h-screen bg-gray-50" />
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://ferrummail.com';

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

import { Suspense } from 'react';
import { HeroSkeleton } from '@/components/home/HeroSkeleton';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#F9F9F7]">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <BrandStory />
      <Reviews />
      <FAQ />
    </div>
  );
}
