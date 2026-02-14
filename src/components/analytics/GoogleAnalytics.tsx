'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export function GoogleAnalytics({ gaId }: { gaId: string }) {
    if (!gaId) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="worker"
            />
            <Script id="google-analytics" strategy="worker">
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
