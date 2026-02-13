import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ProductViewer } from '@/components/catalog/ProductViewer';
import { CollectionCarousel } from '@/components/catalog/CollectionCarousel';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import { routing } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

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

    const productTitle = t(`products.${product.id}`);
    const title = `${productTitle} | FerrumDecor`;
    const description = `${productTitle} - ${product.material} ${product.category}. ${t('description')}`;

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
            siteName: 'FerrumDecor',
            images: [
                {
                    url: `${baseUrl}${product.image}`,
                    width: 1200,
                    height: 630,
                    alt: productTitle,
                }
            ],
            locale: locale === 'de' ? 'de_DE' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${baseUrl}${product.image}`],
        }
    };
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const products = productsData as Product[];
    const product = products.find(p => p.id === Number(id));

    if (!product) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: 'Catalog' });
    const baseUrl = 'https://ferrumdecorstudio.shop';
    const productName = t(`products.${product.id}`);

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productName,
        image: `${baseUrl}${product.image}`,
        description: `${productName} - ${product.material} ${product.category}. Handcrafted excellence.`,
        sku: `FD-MB-${product.id}`,
        brand: {
            '@type': 'Brand',
            name: 'FerrumDecor'
        },
        offers: {
            '@type': 'Offer',
            url: `${baseUrl}/${locale}/catalog/${product.id}`,
            priceCurrency: 'USD',
            price: product.priceNumeric,
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2026-12-31'
        }
    };

    return (
        <div className="pt-20 bg-[#050505] min-h-screen">
            <section className="relative w-full pt-0 pb-0 overflow-hidden min-h-[calc(100vh-6rem)]">
                {/* Product Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
                />

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
                    <Breadcrumbs locale={locale} />
                    <ProductViewer product={product} />

                    <div className="mt-2 lg:mt-0">
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
