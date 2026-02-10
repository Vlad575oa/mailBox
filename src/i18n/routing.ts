import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['de', 'en', 'ru', 'ja', 'it', 'fr', 'uk'],

    // Used when no locale matches
    defaultLocale: 'de',

    // consistently use valid locale prefixes
    localePrefix: 'always'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
