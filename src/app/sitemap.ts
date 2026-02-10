import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import productsData from '@/data/products.json';

const host = 'https://ferrumdecorstudio.shop';

export default function sitemap(): MetadataRoute.Sitemap {
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
                url: `${host}/${locale}/catalog?id=${product.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9,
                // We should ideally add alternates here too if Next.js supported them in sitemap easily, 
                // but standard sitemap.xml doesn't enforce hreflang inside it (it's in the page head usually).
            });
        });
    });

    return sitemapEntries;
}
