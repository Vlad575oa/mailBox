'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

export function Navbar() {
    const t = useTranslations('Navbar');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navbar background opacity based on scroll
    const headerBackground = isScrolled
        ? 'rgba(9, 9, 11, 0.8)' // Zinc 950 with opacity
        : 'rgba(0, 0, 0, 0)';

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'backdrop-blur-xl border-b border-white/5 shadow-2xl' : ''
                    }`}
                style={{ backgroundColor: headerBackground }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="w-full flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className={`text-2xl font-medium tracking-widest transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-black'
                            }`}>
                            FERRUM<span className="font-bold text-[#D4AF37]">DECOR</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        <nav className="flex gap-8">
                            {['about', 'features', 'reviews', 'faq'].map((item) => (
                                <Link
                                    key={item}
                                    href={item === 'about' ? '#brand-story' : `#${item}`}
                                    className={`relative text-lg font-medium tracking-wide transition-colors duration-300 group ${isScrolled ? 'text-white hover:text-[#D4AF37]' : 'text-black hover:text-[#D4AF37]'
                                        }`}
                                >
                                    {t(item)}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </nav>

                        <div className={`h-6 w-px transition-colors duration-300 ${isScrolled ? 'bg-white/10' : 'bg-black/10'
                            }`}></div>

                        <div className="flex items-center gap-6">
                            <Link
                                href="/catalog"
                                className={`text-lg font-medium tracking-wide transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#D4AF37]' : 'text-black hover:text-[#D4AF37]'
                                    }`}
                            >
                                {t('catalog')}
                            </Link>

                            <LanguageSwitcher isScrolled={isScrolled} />

                            <a
                                href="https://ferrumdecorstudio.shop/collections/mail-boxes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`relative px-6 py-2.5 ml-8 overflow-hidden group rounded-full transition-colors duration-300 ${isScrolled ? 'bg-white hover:bg-[#D4AF37]' : 'bg-black hover:bg-[#D4AF37]'
                                    }`}
                            >
                                <span className={`relative text-base font-medium tracking-wider uppercase transition-colors ${isScrolled ? 'text-black' : 'text-white'
                                    }`}>
                                    {t('shop')}
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
                                {['about', 'features', 'reviews', 'faq'].map((item) => (
                                    <Link
                                        key={item}
                                        href={item === 'about' ? '#brand-story' : `#${item}`}
                                        className="text-2xl font-light text-white/90 hover:text-[#D4AF37] transition-colors"
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
                                    className="w-full max-w-[200px] text-center px-6 py-4 rounded-full bg-[#D4AF37] text-black font-bold tracking-widest uppercase hover:bg-white transition-colors duration-300"
                                >
                                    {t('shop')}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
