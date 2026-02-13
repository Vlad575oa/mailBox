import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import FeaturesClient from '@/components/features/FeaturesClient';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'FeaturesPage' });
    const baseUrl = 'https://ferrummail.com';
    const canonicalUrl = `${baseUrl}/${locale}/features`;

    const languages = {} as Record<string, string>;
    routing.locales.forEach(loc => {
        languages[loc] = `${baseUrl}/${loc}/features`;
    });

    const title = `${t('title')} | FerrumDecor`;
    const description = t('items.materials.description');

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                ...languages,
                'x-default': `${baseUrl}/de/features`
            }
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: 'FerrumDecor',
            images: [
                {
                    url: `${baseUrl}/images/PURE_BRASS_Personalized_Mailbox.jpg`,
                    width: 1200,
                    height: 630,
                    alt: 'Features FerrumDecor',
                }
            ],
            locale: locale === 'de' ? 'de_DE' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${baseUrl}/images/PURE_BRASS_Personalized_Mailbox.jpg`],
        }
    };
}

export default async function FeaturesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <FeaturesClient locale={locale} />;
}
