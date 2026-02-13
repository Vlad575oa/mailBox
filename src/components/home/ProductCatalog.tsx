import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import { CatalogClientWrapper } from './CatalogClientWrapper';

interface ProductCatalogProps {
    id?: string;
}

export async function ProductCatalog({ id }: ProductCatalogProps) {
    const t = await getTranslations('Catalog');
    const products = productsData as Product[];

    const initialProduct = id
        ? products.find(p => p.id === Number(id)) || products[0]
        : products[0];

    return (
        <section className="relative w-full bg-[#050505] pt-4 pb-0 overflow-hidden min-h-screen" id="catalog">
            {/* Background Image - Server Rendered for LCP */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/back_catalog.webp"
                    alt="Catalog Background"
                    fill
                    className="object-cover opacity-40"
                    priority
                    fetchPriority="high"
                    loading="eager"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#050505] to-[#000000] opacity-40 pointer-events-none z-1" />

            <div className="container relative z-10 mx-auto px-4 pb-12">
                <h1 className="sr-only">
                    {t('title_start')} {t('title_end')}
                </h1>

                <CatalogClientWrapper
                    products={products}
                    initialProduct={initialProduct}
                />
            </div>
        </section>
    );
}
