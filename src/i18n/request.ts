import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'de', 'fr', 'it', 'ja', 'ru', 'uk'];

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !locales.includes(locale as any)) {
        locale = 'en'; // Fallback to default
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
