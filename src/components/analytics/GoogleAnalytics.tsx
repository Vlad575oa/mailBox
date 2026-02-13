'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export function GoogleAnalytics({ gaId }: { gaId: string }) {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const loadAnalytics = () => {
            // Wait for the browser to be idle after the page has fully loaded
            if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(() => setShouldLoad(true), { timeout: 2000 });
            } else {
                // Fallback for older browsers
                setTimeout(() => setShouldLoad(true), 1000);
            }
        };

        if (document.readyState === 'complete') {
            loadAnalytics();
        } else {
            window.addEventListener('load', loadAnalytics);
            return () => window.removeEventListener('load', loadAnalytics);
        }
    }, []);

    if (!gaId || !shouldLoad) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
            </Script>
        </>
    );
}
