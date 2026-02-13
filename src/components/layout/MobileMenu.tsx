'use client';

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface MobileMenuProps {
    homeText: string;
    navItems: { id: string; label: string }[];
}

export function MobileMenu({ homeText, navItems }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden flex items-center gap-4">
            <button
                className="p-2 text-white/80 hover:text-white transition-colors z-[60] relative"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-[#09090b]/95 backdrop-blur-xl pt-24"
                    >
                        <div className="container mx-auto px-6 flex flex-col gap-8 h-full">
                            <nav className="flex flex-col gap-6 items-center">
                                <Link
                                    href="/"
                                    className="text-2xl font-light text-white/90 hover:text-[#C5A059] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {homeText}
                                </Link>
                                {navItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={
                                            item.id === 'catalog' ? '/catalog' :
                                                item.id === 'features' ? '/features' :
                                                    item.id === 'about' ? '/about' :
                                                        item.id === 'contact' ? '/contact' :
                                                            item.id === 'faq' ? '/#faq' : `#${item.id}`
                                        }
                                        className="text-2xl font-light text-white/90 hover:text-[#C5A059] transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                            <div className="w-12 h-px bg-white/10 mx-auto"></div>
                            <div className="flex flex-col items-center gap-6">
                                <LanguageSwitcher isScrolled={true} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
