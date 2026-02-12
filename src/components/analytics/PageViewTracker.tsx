'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { sendGTMEvent } from '@/lib/gtm';

export function PageViewTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname) {
            sendGTMEvent('page_view', {
                page_path: pathname,
                page_search: searchParams?.toString() || '',
            });
        }
    }, [pathname, searchParams]);

    return null;
}
