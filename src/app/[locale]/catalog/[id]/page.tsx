import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ProductViewer } from '@/components/catalog/ProductViewer';
import { CollectionCarousel } from '@/components/catalog/CollectionCarousel';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
    const products = productsData as Product[];
    const params: { locale: string; id: string }[] = [];

    for (const locale of routing.locales) {
        for (const product of products) {
            params.push({ locale, id: String(product.id) });
        }
    }
    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const product = (productsData as Product[]).find(p => p.id === Number(id));

    if (!product) return {};

    const t = await getTranslations({ locale, namespace: 'Catalog' });
    const baseUrl = 'https://ferrumdecorstudio.shop';
    const canonicalUrl = `${baseUrl}/${locale}/catalog/${product.id}`;

    const languages = {} as Record<string, string>;
    routing.locales.forEach(loc => {
        languages[loc] = `${baseUrl}/${loc}/catalog/${product.id}`;
    });

    const title = `${t(`products.${product.id}`)} | FerrumDecor`;
    const description = `${t(`products.${product.id}`)} - ${t('description')}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                ...languages,
                'x-default': `${baseUrl}/de/catalog/${product.id}`
            }
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            images: [{ url: product.image }]
        }
    };
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { id } = await params;
    const products = productsData as Product[];
    const product = products.find(p => p.id === Number(id));

    if (!product) {
        notFound();
    }

    return (
        <div className="pt-24 bg-[#050505] min-h-screen">
            <section className="relative w-full pt-4 pb-0 overflow-hidden min-h-[calc(100vh-6rem)]">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/back_catalog.webp"
                        alt="Catalog Background"
                        fill
                        className="object-cover opacity-40"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#050505] to-[#000000] opacity-40 pointer-events-none z-1" />

                <div className="container relative z-10 mx-auto">
                    <ProductViewer product={product} />

                    <div className="mt-8 sm:mt-12">
                        <CollectionCarousel
                            products={products}
                            activeId={product.id}
                            useLinks={true}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
