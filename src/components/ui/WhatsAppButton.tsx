'use client';

import { useState, useEffect } from 'react';
import { useWhatsApp } from '@/context/WhatsAppContext';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { sendGTMEvent } from '@/lib/gtm';

export function WhatsAppButton() {
    const t = useTranslations('WhatsApp');
    const { handleClick } = useWhatsApp();
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                // Adjust rootMargin to trigger hiding a bit earlier if needed
                rootMargin: '0px 0px 50px 0px'
            }
        );

        const footer = document.getElementById('contact');
        if (footer) {
            observer.observe(footer);
        }

        return () => {
            if (footer) {
                observer.unobserve(footer);
            }
        };
    }, []);

    // Business phone number
    const PHONE_NUMBER = '380673814404';

    const greeting = encodeURIComponent(t('greeting'));
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${greeting}`;

    const trackConversion = (label: string) => {
        sendGTMEvent('whatsapp_click', {
            event_category: 'conversion',
            event_label: label,
            transport_type: 'beacon'
        });

        // Keep legacy gtag if needed, or remove. Keeping for safety as fallback
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'click_whatsapp_cta', {
                'event_category': 'conversion',
                'event_label': label,
                'transport_type': 'beacon'
            });
        }
    };

    const handleWhatsAppClick = (url: string, label: string) => {
        trackConversion(label);
        handleClick(url);
    };

    return (
        <>
            {/* Mobile Sticky Button */}
            <div className={`hidden max-md:flex fixed bottom-2 left-0 right-0 z-50 px-2 justify-center pointer-events-none transition-all duration-500 ${isFooterVisible ? 'opacity-0 translate-y-10 invisible' : 'opacity-100 translate-y-0'}`}>
                <div className="relative w-full max-w-sm pointer-events-auto group">
                    {/* Tooltip - Appears ABOVE button on mobile */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-xs font-light tracking-wide shadow-xl opacity-0 translate-y-4 invisible transition-all duration-500 delay-[3000ms] group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-0 group-hover:visible w-64 text-center z-50">
                        {t('tooltip')} <a href="/privacy" className="underline hover:text-[#25D366] transition-colors">{t('privacy_link')}</a>
                    </div>

                    <button
                        onClick={() => handleWhatsAppClick(whatsappUrl, 'Mobile Sticky Button')}
                        className="mx-auto py-[13px] px-6 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.2)] active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden text-white border border-white/10"
                        aria-label="Contact us on WhatsApp"
                    >
                        {/* Pulsing Background */}
                        <div className="absolute inset-0 bg-[#25D366]/60 backdrop-blur-md" />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10" />

                        <FaWhatsapp className="text-xl relative z-20" />
                        <span className="font-medium text-[19px] relative z-20 tracking-wide">{t('cta_sticky')}</span>
                    </button>
                </div>
            </div>

            {/* Desktop Floating Button */}
            <div className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-4 group/container pointer-events-none">
                {/* Tooltip */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-xs font-light tracking-wide shadow-xl opacity-0 translate-x-4 invisible transition-all duration-500 delay-[3000ms] group-hover/container:opacity-100 group-hover/container:translate-x-0 group-hover/container:delay-0 group-hover/container:visible w-64 text-right">
                    {t('tooltip')} <a href="/privacy" className="underline hover:text-[#25D366] transition-colors">{t('privacy_link')}</a>
                </div>

                {/* Button */}
                <button
                    onClick={() => handleWhatsAppClick(whatsappUrl, 'Desktop Floating Button')}
                    className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all duration-500 flex items-center justify-center group relative overflow-hidden pointer-events-auto"
                    aria-label="Contact us on WhatsApp"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/active:translate-y-0 transition-transform duration-500" />
                    <FaWhatsapp className="text-3xl relative z-10" />
                </button>
            </div>
        </>
    );
}
