'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const SmoothScroll = dynamic(() => import('@/components/layout/SmoothScroll').then(mod => mod.SmoothScroll), { ssr: false });
const WhatsAppButton = dynamic(() => import('@/components/ui/WhatsAppButton').then(mod => mod.WhatsAppButton), { ssr: false });
const WhatsAppPrivacyToast = dynamic(() => import('@/components/ui/WhatsAppPrivacyToast').then(mod => mod.WhatsAppPrivacyToast), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/ui/CookieConsent').then(mod => mod.CookieConsent), { ssr: false });
const PageViewTracker = dynamic(() => import('@/components/analytics/PageViewTracker').then(mod => mod.PageViewTracker), { ssr: false });
const GoogleAnalytics = dynamic(() => import('@/components/analytics/GoogleAnalytics').then(mod => mod.GoogleAnalytics), { ssr: false });
const GoogleTagManager = dynamic(() => import('@/components/analytics/GoogleTagManager').then(mod => mod.GoogleTagManager), { ssr: false });
const YandexMetrika = dynamic(() => import('@/components/analytics/YandexMetrika').then(mod => mod.YandexMetrika), { ssr: false });

export function ClientSideUtilities({ children, gaId }: { children: ReactNode; gaId: string }) {
    return (
        <>
            <PageViewTracker />
            <GoogleAnalytics gaId={gaId} />
            <GoogleTagManager gtmId="GTM-TCSTJK3J" />
            <YandexMetrika />
            <SmoothScroll>
                {children}
                <WhatsAppButton />
                <WhatsAppPrivacyToast />
                <CookieConsent />
            </SmoothScroll>
        </>
    );
}
