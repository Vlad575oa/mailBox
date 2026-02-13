'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function CookieConsent() {
    const t = useTranslations('CookieConsent');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'circOut' }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100]"
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
                </motion.div>
            )}
        </AnimatePresence>
    );
}
