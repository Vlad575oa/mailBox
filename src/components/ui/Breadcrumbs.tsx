'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FaChevronRight, FaHome } from 'react-icons/fa';

interface BreadcrumbsProps {
    locale: string;
}

export function Breadcrumbs({ locale }: BreadcrumbsProps) {
    const pathname = usePathname();
    const t = useTranslations('Navbar');
    const tCatalog = useTranslations('Catalog');

    // Remove locale prefix from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    const segments = pathWithoutLocale.split('/').filter(Boolean);

    const breadcrumbs = [
        { label: t('home'), href: `/${locale}` },
        ...segments.map((segment, index) => {
            const href = `/${locale}/${segments.slice(0, index + 1).join('/')}`;
            // Handle specific labels for known segments
            let label = segment.charAt(0).toUpperCase() + segment.slice(1);

            if (segment === 'catalog') label = t('catalog');
            if (segment === 'about') label = t('about');
            if (segment === 'contact') label = t('contact');
            if (segment === 'features') label = t('features');

            // If it's a number (product ID), pull the actual product name from translations
            if (!isNaN(Number(segment))) {
                const productName = tCatalog(`products.${segment}`);
                // next-intl returns the key itself if the translation is missing
                if (productName && !productName.includes(`products.${segment}`)) {
                    label = productName;
                } else {
                    label = tCatalog('product_details') || 'Product';
                }
            }

            return { label, href };
        })
    ];

    // Schema.org BreadcrumbList
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.label,
            item: `https://ferrummail.com${crumb.href}`
        }))
    };

    if (breadcrumbs.length <= 1) return null;

    return (
        <nav aria-label="Breadcrumb" className="mb-8 overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ol className="flex items-center flex-wrap gap-2 text-sm text-white/50">
                {breadcrumbs.map((crumb, index) => (
                    <li key={crumb.href} className="flex items-center gap-2">
                        {index > 0 && <FaChevronRight size={10} className="text-white/20" />}
                        {index === breadcrumbs.length - 1 ? (
                            <span className="text-[#C5A059] font-medium truncate max-w-[200px]">
                                {crumb.label}
                            </span>
                        ) : (
                            <Link
                                href={crumb.href}
                                className="hover:text-white transition-colors flex items-center gap-1.5"
                            >
                                {index === 0 && <FaHome size={12} />}
                                {crumb.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
