'use client';

import { Button } from '@/components/ui/Button';
import { FaWhatsapp } from 'react-icons/fa';
import { useWhatsApp } from '@/context/WhatsAppContext';
import { trackWhatsAppClick } from '@/lib/analytics';

interface HeroCTAProps {
    ctaLine1: string;
    ctaLine2: string;
    whatsappGreeting: string;
}

export function HeroCTA({ ctaLine1, ctaLine2, whatsappGreeting }: HeroCTAProps) {
    const { handleClick } = useWhatsApp();

    const trackConversion = (label: string) => {
        trackWhatsAppClick(label);
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
        <div className="flex gap-4 justify-center lg:justify-start">
            <Button
                onClick={() => handleWhatsAppClick(`https://wa.me/380673814404?text=${encodeURIComponent(whatsappGreeting)}`, 'Hero CTA Button')}
                variant="gold"
                size="lg"
                className="min-w-[280px] py-2 md:py-3 h-auto flex items-center justify-center gap-3 shadow-xl shadow-[#C5A059]/20 tracking-widest leading-tight px-6 group"
            >
                <FaWhatsapp size={24} className="text-black/80" />
                <div className="flex flex-col items-center">
                    <span className="text-base md:text-base font-bold uppercase">{ctaLine1}</span>
                    <span className="text-[13px] md:text-xs font-medium text-black/70 lowercase">{ctaLine2}</span>
                </div>
            </Button>
        </div>
    );
}
