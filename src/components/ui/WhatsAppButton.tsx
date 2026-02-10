'use client';

import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/FadeIn';

export function WhatsAppButton() {
    const t = useTranslations('WhatsApp');
    const [isHovered, setIsHovered] = useState(false);
    const [hasConsented, setHasConsented] = useState(false);

    // Business phone number
    const PHONE_NUMBER = '380673814404';

    const greeting = encodeURIComponent(t('greeting'));
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${greeting}`;

    const handleClick = () => {
        // The click itself is the consent based on the tooltip text.
        if (!hasConsented) {
            setHasConsented(true);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 group/container">
            {/* Consent Tooltip */}
            <div
                className={`
                    bg-gray-900/95 backdrop-blur-md text-white text-[10px] leading-relaxed p-4 rounded-2xl shadow-2xl border border-white/10 
                    max-w-[200px] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-right
                    ${isHovered ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 translate-x-8 pointer-events-none'}
                `}
            >
                <div className="flex flex-col gap-2">
                    <p className="text-gray-300">
                        {t('tooltip')}
                    </p>
                    <Link
                        href="/privacy"
                        className="text-[#25D366] font-semibold hover:underline flex items-center gap-1"
                    >
                        {t('privacy_link')}
                        <span className="text-[12px]">→</span>
                    </Link>
                </div>
                {/* Tooltip Arrow */}
                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900/95 border-r border-t border-white/10 rotate-45" />
            </div>

            {/* Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all duration-500 flex items-center justify-center group relative overflow-hidden"
                aria-label="Contact us on WhatsApp"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/active:translate-y-0 transition-transform duration-500" />
                <FaWhatsapp className="text-3xl relative z-10" />
            </a>
        </div>
    );
}
