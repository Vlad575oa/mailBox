'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

export function Navbar() {
    const t = useTranslations('Navbar');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-gray-900">
                        Ferrum<span className="text-primary">Decor</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <nav className="flex gap-6">
                        <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                            {t('features')}
                        </Link>
                        <Link href="#reviews" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                            {t('reviews')}
                        </Link>
                        <Link href="#faq" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                            {t('faq')}
                        </Link>
                    </nav>

                    <div className="h-6 w-px bg-gray-200"></div>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />

                        <a
                            href="https://ferrumdecorstudio.shop/collections/mail-boxes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
                        >
                            {t('shop')}
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-100 bg-white"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            <nav className="flex flex-col gap-4">
                                <Link
                                    href="#features"
                                    className="text-lg font-medium text-gray-600 hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('features')}
                                </Link>
                                <Link
                                    href="#reviews"
                                    className="text-lg font-medium text-gray-600 hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('reviews')}
                                </Link>
                                <Link
                                    href="#faq"
                                    className="text-lg font-medium text-gray-600 hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('faq')}
                                </Link>
                            </nav>

                            <div className="h-px w-full bg-gray-100 my-2"></div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 font-medium">Language</span>
                                    <LanguageSwitcher />
                                </div>

                                <a
                                    href="https://ferrumdecorstudio.shop/collections/mail-boxes"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-center px-4 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark transition-colors"
                                >
                                    {t('shop')}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
