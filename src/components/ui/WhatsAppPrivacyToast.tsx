'use client';

import { useWhatsApp } from '@/context/WhatsAppContext';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export function WhatsAppPrivacyToast() {
    const { privacyToastVisible, hideToast } = useWhatsApp();
    const t = useTranslations('WhatsApp');

    if (!privacyToastVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="fixed bottom-24 left-4 right-4 md:bottom-8 md:left-auto md:right-8 md:max-w-md z-[100] pointer-events-none"
            >
                <div className="bg-[#1a1a1a]/95 backdrop-blur-md border border-[#C5A059]/30 p-4 rounded-xl shadow-2xl shadow-black/50 pointer-events-auto flex flex-col gap-2">
                    <p className="text-white/90 text-sm leading-relaxed">
                        {t('tooltip')}
                    </p>
                    <Link
                        href="/privacy"
                        className="text-[#C5A059] text-xs font-bold uppercase tracking-wider hover:underline w-fit"
                        onClick={hideToast}
                    >
                        {t('privacy_link')}
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
