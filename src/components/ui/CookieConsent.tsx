'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
export function CookieConsent() {
    const t = useTranslations('CookieConsent');
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const renderTimer = setTimeout(() => setShouldRender(true), 1500);
            const visibilityTimer = setTimeout(() => setIsVisible(true), 1600);
            return () => {
                clearTimeout(renderTimer);
                clearTimeout(visibilityTimer);
            };
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
        setTimeout(() => setShouldRender(false), 500);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
        setTimeout(() => setShouldRender(false), 500);
    };

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100] transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
        >
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                {/* Decorative background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/5 via-transparent to-transparent opacity-50" />

                <div className="relative z-10">
                    <h3 className="text-white font-serif italic text-lg mb-2 tracking-wide">
                        Cookies
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {t('message')}{' '}
                        <Link href="/privacy" className="text-[#C5A059] hover:underline underline-offset-4">
                            {t('privacy_policy')}
                        </Link>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleAccept}
                            className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black text-sm font-bold uppercase tracking-wider rounded-lg hover:shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all active:scale-95"
                        >
                            {t('accept')}
                        </button>
                        <button
                            onClick={handleDecline}
                            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-all active:scale-95"
                        >
                            {t('decline')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
