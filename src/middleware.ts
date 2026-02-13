import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

export const runtime = 'experimental-edge';

const intlMiddleware = createMiddleware({
    locales: routing.locales,
    defaultLocale: 'de',
    localePrefix: 'always' // Ensure consistent URL structure
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const locales = routing.locales;

    // Check if user is already on a localized path
    const hasLocalePrefix = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // If no locale prefix is present, check for Geo-redirection
    if (!hasLocalePrefix) {
        const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry');

        // Stronger case: specific redirect for RU as requested
        if (country?.toUpperCase() === 'RU') {
            const url = request.nextUrl.clone();
            url.pathname = `/ru${pathname === '/' ? '' : pathname}`;
            return NextResponse.redirect(url);
        }

        // For other countries, let intlMiddleware handle language detection via accept-language
        // or just use the defaultLocale ('de') if no header matches.
    }

    const response = intlMiddleware(request);
    response.headers.set('x-pathname', pathname);
    return response;
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|sitemap.xml|robots.txt|.*\\..*).*)']
};
