'use client';

import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import { useWhatsApp } from '@/context/WhatsAppContext';
import { trackWhatsAppClick } from '@/lib/analytics';

interface WhatsAppActionProps {
    tooltip: string;
    privacyLabel: string;
    greeting: string;
    placement: 'desktop' | 'mobile';
}

export function WhatsAppAction({ tooltip, privacyLabel, greeting, placement }: WhatsAppActionProps) {
    const { handleClick } = useWhatsApp();

    return (
        <div className="relative group">
            <div className={`absolute top-full right-0 mt-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-xs font-light tracking-wide shadow-xl opacity-0 translate-y-4 invisible transition-all duration-500 delay-[3000ms] group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-0 group-hover:visible w-64 text-right z-50 pointer-events-none group-hover:pointer-events-auto`}>
                {tooltip} <Link href="/privacy" className="underline hover:text-[#25D366] transition-colors">{privacyLabel}</Link>
            </div>
            <button
                onClick={() => {
                    trackWhatsAppClick(`navbar_${placement}`);
                    handleClick(`https://wa.me/380673814404?text=${encodeURIComponent(greeting)}`);
                }}
                className={`text-white hover:text-[#25D366] transition-colors duration-300 ${placement === 'desktop' ? 'hover:scale-110' : ''} block`}
            >
                <FaWhatsapp size={24} />
            </button>
        </div>
    );
}
