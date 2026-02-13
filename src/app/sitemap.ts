import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import productsData from '@/data/products.json';

import { headers } from 'next/headers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const headersList = await headers();
    const host = headersList.get('host')
        ? `https://${headersList.get('host')}`
        : 'https://ferrummail.com';
    const locales = routing.locales;
    const products = productsData;

    // Core routes
    const routes = [
        '', // home
        '/catalog',
        '/about',
        '/contact',
        '/features' // features section is often a page or section, ensuring it's indexable if it exists as page. 
        // Based on navbar, 'features' links to /features.
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // 1. Generate entries for core routes in all locales
    routes.forEach(route => {
        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${host}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: route === '' ? 1.0 : 0.8,
            });
        });
    });

    // 2. Generate entries for products (via catalog query param)
    // Note: Google accepts query params.
    products.forEach(product => {
        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${host}/${locale}/catalog/${product.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9,
            });
        });
    });

    return sitemapEntries;
}
