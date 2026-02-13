'use client';

import { useState, useEffect } from 'react';

interface NavbarBackgroundProps {
    isCatalogPage: boolean;
}

export function NavbarBackground({ isCatalogPage }: NavbarBackgroundProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = isScrolled || isCatalogPage;

    return (
        <div
            className={`absolute inset-0 z-[-1] transition-all duration-300 ${isActive ? 'bg-[#09090b]/85 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent'
                }`}
        />
    );
}
