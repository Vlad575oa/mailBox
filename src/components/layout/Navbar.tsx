'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

export function Navbar() {
    const t = useTranslations('Navbar');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isCatalogPage = pathname.includes('/catalog');
    const { scrollY } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navbar background opacity based on scroll or page
    const headerBackground = (isScrolled || isCatalogPage)
        ? 'rgba(9, 9, 11, 0.85)' // Darker background
        : 'rgba(0, 0, 0, 0)';

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${(isScrolled || isCatalogPage) ? 'backdrop-blur-xl border-b border-white/5 shadow-2xl' : ''
                    }`}
                style={{ backgroundColor: headerBackground }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="w-full flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="text-2xl font-medium tracking-widest text-white">
                                FERRUM<span className="font-bold text-gradient-gold ml-1">DECOR</span>
                            </span>
                        </Link>

                        {/* Home Link - Desktop Only */}
                        <Link
                            href="/"
                            className="hidden md:block relative text-lg font-medium tracking-wide transition-colors duration-300 group text-white hover:text-gradient-gold"
                        >
                            {t('home')}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        <nav className="flex gap-8">
                            {['catalog', 'about', 'features', 'faq', 'contact'].map((item) => (
                                <Link
                                    key={item}
                                    href={
                                        item === 'catalog' ? '/catalog' :
                                            item === 'features' ? '/features' :
                                                item === 'about' ? '/about' :
                                                    item === 'contact' ? '/contact' :
                                                        item === 'faq' ? '/#faq' :
                                                            `#${item}`
                                    }
                                    className={`relative text-lg font-medium tracking-wide transition-colors duration-300 group text-white hover:text-gradient-gold`}
                                >
                                    {t(item)}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </nav>

                        <div className="h-6 w-px bg-white/10"></div>

                        <div className="flex items-center gap-6">

                            <LanguageSwitcher isScrolled={isScrolled} />

                            <a
                                href="https://ferrumdecorstudio.shop/collections/mail-boxes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`relative px-8 py-3 ml-8 overflow-hidden group rounded-full transition-all duration-500 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-[length:200%_auto] hover:bg-right hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] flex flex-col items-center justify-center leading-tight`}
                            >
                                <span className={`relative text-base font-bold tracking-wider uppercase transition-colors text-black`}>
                                    {t('shop')}
                                </span>
                                <span className="relative text-[10px] font-medium text-black/70 tracking-tight lowercase">
                                    {t('shop_note')}
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Navigation Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[#09090b]/95 backdrop-blur-xl pt-24 md:hidden"
                    >
                        <div className="container mx-auto px-6 flex flex-col gap-8 h-full">
                            <nav className="flex flex-col gap-6 items-center">
                                {['home', 'catalog', 'about', 'features', 'faq', 'contact'].map((item) => (
                                    <Link
                                        key={item}
                                        href={
                                            item === 'home' ? '/' :
                                                item === 'catalog' ? '/catalog' :
                                                    item === 'features' ? '/features' :
                                                        item === 'about' ? '/about' :
                                                            item === 'contact' ? '/contact' :
                                                                item === 'faq' ? '/#faq' :
                                                                    `#${item}`
                                        }
                                        className="text-2xl font-light text-white/90 hover:text-[#C5A059] transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {t(item)}
                                    </Link>
                                ))}
                            </nav>

                            <div className="w-12 h-px bg-white/10 mx-auto"></div>

                            <div className="flex flex-col items-center gap-6">
                                <LanguageSwitcher isScrolled={isScrolled} />

                                <a
                                    href="https://ferrumdecorstudio.shop/collections/mail-boxes"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full max-w-[240px] flex flex-col items-center justify-center px-6 py-4 rounded-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-[length:200%_auto] hover:bg-right text-black transition-all duration-500 shadow-lg shadow-[#C5A059]/20 leading-tight"
                                >
                                    <span className="text-base font-bold tracking-widest uppercase">{t('shop')}</span>
                                    <span className="text-[10px] font-medium text-black/70 tracking-tight lowercase">{t('shop_note')}</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
