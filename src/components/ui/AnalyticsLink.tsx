'use client';

import { ReactNode } from 'react';
import { trackEtsyClick, trackFerrumShopClick, trackWhatsAppClick } from '@/lib/analytics';

type AnalyticsEvent = 'etsy_footer_icon' | 'etsy_footer_links' | 'ferrum_shop_footer' | 'whatsapp_footer_icon';

interface AnalyticsLinkProps {
    href: string;
    event: AnalyticsEvent;
    children: ReactNode;
    className?: string;
    target?: string;
    rel?: string;
}

export function AnalyticsLink({ href, event, children, className, target, rel }: AnalyticsLinkProps) {
    const handleClick = () => {
        if (event === 'etsy_footer_icon') trackEtsyClick('footer_icon');
        if (event === 'etsy_footer_links') trackEtsyClick('footer_links');
        if (event === 'ferrum_shop_footer') trackFerrumShopClick('footer');
        if (event === 'whatsapp_footer_icon') trackWhatsAppClick('footer_icon');
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className={className}
            target={target}
            rel={rel}
        >
            {children}
        </a>
    );
}
