import { Suspense } from 'react';
import { ProductCatalog } from '@/components/home/ProductCatalog';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { getTranslations } from 'next-intl/server';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

type Props = {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
    return ['de', 'en', 'ru', 'ja', 'it', 'fr', 'uk'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params, searchParams }: Props) {
    const { locale } = await params;
    const { id } = await searchParams;
    const t = await getTranslations({ locale, namespace: 'Catalog' });
    const baseUrl = 'https://ferrummail.com';

    // Find product if id exists
    const productId = id ? Number(id) : null;
    const product = productId ? (productsData as Product[]).find(p => p.id === productId) : null;

    // Base URL for this page (catalog root)
    const pagePath = `${baseUrl}/${locale}/catalog`;
    const canonicalUrl = product ? `${pagePath}?id=${product.id}` : pagePath;

    const languages = {} as Record<string, string>;
    ['de', 'en', 'ru', 'ja', 'it', 'fr', 'uk'].forEach(loc => {
        languages[loc] = product
            ? `${baseUrl}/${loc}/catalog?id=${product.id}`
            : `${baseUrl}/${loc}/catalog`;
    });

    const title = product
        ? t(`products.${product.id}`)
        : `${t('title_start')} ${t('title_end')}`;

    const description = product
        ? `${t(`products.${product.id}`)} - ${t('description')}`
        : t('description');

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                ...languages,
                'x-default': product
                    ? `${baseUrl}/de/catalog?id=${product.id}`
                    : `${baseUrl}/de/catalog`
            }
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            images: product ? [{ url: product.image }] : undefined
        }
    };
}

export default async function CatalogPage({ params, searchParams }: Props) {
    const { locale } = await params;
    const { id } = await searchParams;

    // Catalog page render
    return (
        <div className="pt-20 bg-[#050505] min-h-screen">
            <ScrollToTop />
            <div className="container mx-auto px-6 mt-0 relative z-10">
                <Breadcrumbs locale={locale} />
            </div>
            <Suspense fallback={
                <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                    <div className="animate-pulse text-[#C5A059] font-serif italic text-xl">FerrumDecor...</div>
                </div>
            }>
                <ProductCatalog id={id as string} />
            </Suspense>
        </div>
    );
}
