import { MetadataRoute } from 'next';

import { headers } from 'next/headers';

export default async function robots(): Promise<MetadataRoute.Robots> {
    const headersList = await headers();
    const host = headersList.get('host')
        ? `https://${headersList.get('host')}`
        : 'https://ferrummail.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${host}/sitemap.xml`,
    };
}
