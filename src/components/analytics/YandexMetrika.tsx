'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

const METRIKA_ID = 106825200;

export function YandexMetrika() {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const loadMetrika = () => {
            if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(() => setShouldLoad(true), { timeout: 2000 });
            } else {
                setTimeout(() => setShouldLoad(true), 1000);
            }
        };

        if (document.readyState === 'complete') {
            loadMetrika();
        } else {
            window.addEventListener('load', loadMetrika);
            return () => window.removeEventListener('load', loadMetrika);
        }
    }, []);

    if (!shouldLoad) return null;

    return (
        <Script id="yandex-metrika" strategy="afterInteractive">
            {`
                (function(m,e,t,r,i,k,a){
                    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}', 'ym');

                ym(${METRIKA_ID}, 'init', {
                    ssr: true,
                    webvisor: true,
                    clickmap: true,
                    ecommerce: "dataLayer",
                    accurateTrackBounce: true,
                    trackLinks: true
                });
            `}
        </Script>
    );
}

export function YandexMetrikaNoScript() {
    return (
        <noscript>
            <div>
                <img
                    src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
                    style={{ position: 'absolute', left: '-9999px' }}
                    alt=""
                />
            </div>
        </noscript>
    );
}
