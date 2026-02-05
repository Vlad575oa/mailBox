import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://ferrumdecorstudio.shop',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        // We could add product pages here if we had detailed pages, 
        // but everything is on home or external.
    ];
}
