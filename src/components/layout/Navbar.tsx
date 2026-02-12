'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { useWhatsApp } from '@/context/WhatsAppContext';

export function Navbar() {
    const t = useTranslations('Navbar');
    const tWA = useTranslations('WhatsApp');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isCatalogPage = pathname.includes('/catalog');
    const { scrollY } = useScroll();
    const { handleClick } = useWhatsApp();

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

                            <div className="relative group">
                                <div className="absolute top-full right-0 mt-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-xs font-light tracking-wide shadow-xl opacity-0 translate-y-4 invisible transition-all duration-500 delay-[3000ms] group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-0 group-hover:visible w-64 text-right z-50">
                                    {tWA('tooltip')} <Link href="/privacy" className="underline hover:text-[#25D366] transition-colors">{tWA('privacy_link')}</Link>
                                </div>
                                <button
                                    onClick={() => handleClick(`https://wa.me/380673814404?text=${encodeURIComponent(tWA('greeting'))}`)}
                                    className="text-white hover:text-[#25D366] transition-colors hover:scale-110 duration-300 block"
                                >
                                    <FaWhatsapp size={24} />
                                </button>
                            </div>

                            <LanguageSwitcher isScrolled={isScrolled} />
                        </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex items-center gap-4 md:hidden">
                        <div className="relative group">
                            <div className="absolute top-full right-0 mt-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-xs font-light tracking-wide shadow-xl opacity-0 translate-y-4 pointer-events-none transition-all duration-500 delay-[3000ms] group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-0 group-hover:pointer-events-auto w-64 text-right z-50">
                                {tWA('tooltip')} <Link href="/privacy" className="underline hover:text-[#25D366] transition-colors">{tWA('privacy_link')}</Link>
                            </div>
                            <button
                                onClick={() => handleClick(`https://wa.me/380673814404?text=${encodeURIComponent(tWA('greeting'))}`)}
                                className="text-white hover:text-[#25D366] transition-colors block"
                            >
                                <FaWhatsapp size={24} />
                            </button>
                        </div>
                        <LanguageSwitcher isScrolled={isScrolled} />
                        <button
                            className="p-2 text-white/80 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
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
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
